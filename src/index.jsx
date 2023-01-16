import ForgeUI, { 
    render, 
    ProjectPage, 
    Fragment, 
    Text,
    useState, 
    User, 
    ButtonSet, 
    Button, 
    Heading,
    Form,
    TextField,
    CheckboxGroup,
    Checkbox,
    Code,
    Image,
    SectionMessage,
    Table,
    Head,
    Row,
    Cell

} from '@forge/ui';
import api, { route } from '@forge/api';
const fetchIssues = async () => {
    const response = await api.asUser().requestJira(route`/rest/api/3/search`);
    const data = await response.json();
    return data;
};

const App = () => {

    const [isOpen, setOpen] = useState(false);
    const [issues] = useState(async () => await fetchIssues());
    const [formState, setFormState] = useState(undefined);



    const goBack = () => { };
    const cancel = () => { };

    const actionButtons = [
        <Button text="Go back" onClick={goBack} />,
        <Button text="Cancel" onClick={cancel} />,
    ]
    return (
        <Fragment>
            <Heading size="large">UI Components</Heading>
            <Text>
                This is a sample app that shows how to use UI components in Forge apps.
            </Text>
            <Text>Issues in MetriKa project</Text>
            <Text>Issues total count {issues.total} </Text>
            <Text>Issues assignee: </Text>

            {/* show the issue key if the field hass an assignee */}

            {issues.issues.map(issue => {
                if (issue.fields.assignee) {
                    return (
                        <Fragment>
                            <Text>{issue.key} -  {issue.fields.assignee.displayName} ✅ </Text>
                            <User accountId={issue.fields.assignee.accountId} />
                        </Fragment>
                    )
                }
            })}

            <Text>Buttons</Text>
            <Button
                text="Button"
                onClick={() => null }
            />
            
            <Text>Button Set</Text>
            <ButtonSet>
                <Button text="Button 1" onClick={() => null } />
                <Button text="Button 2" onClick={() => null } />
            </ButtonSet>


            <Text>Form components</Text>
            <Fragment>
                <Form  actionButtons={actionButtons}>
                    <TextField name="username" label="Username" />
                    <CheckboxGroup name="products" label="Products">
                        <Checkbox defaultChecked value="jira" label="Jira" />
                        <Checkbox value="confluence" label="Confluence" />
                    </CheckboxGroup>
                </Form>
                {formState && <Text>{JSON.stringify(formState)}</Text>}
            </Fragment>

           

            <Text>Image</Text>
            <Image
                src="https://media.giphy.com/media/jUwpNzg9IcyrK/source.gif"
                alt="homer"
                />

            <Text>Section Message</Text>
            <SectionMessage title="Heading" appearance="info">
                <Text>Some text content</Text>
                <Text>More content</Text>
            </SectionMessage>

            <Text>Table</Text>
            <Table>
                <Head>
                <Cell>
                    <Text>Issue ID</Text>
                </Cell>
                <Cell>
                    <Text>Name</Text>
                </Cell>
                </Head>
                {issues.issues.map(issue => (
                <Row>
                    <Cell>
                    <Text>{issue.id}</Text>
                    </Cell>
                    <Cell>
                    <Text>{issue.key}</Text>
                    </Cell>
                </Row>
                ))}
            </Table>


            <Text>On this example we are using these components</Text>
            <Code text={`import ForgeUI, {
                    render,
                    ProjectPage,
                    Fragment,
                    Text,
                    useState,
                    User,
                    ButtonSet,
                    Button,
                    Heading,
                    Form,
                    TextField,
                    CheckboxGroup,
                    Checkbox,
                    Macro,
                    Code,
                    Image,
                    ModalDialog,
                    SectionMessage,
                    Table,
                    Head,
                    Row,
                    Cell
                } from '@forge/ui'; `} language="javascript" />

        </Fragment>
    );
};

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);
