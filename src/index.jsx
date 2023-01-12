import ForgeUI, { render, ProjectPage, Fragment, Text, useState, Button } from '@forge/ui';
import api, { route } from '@forge/api';

const fetchIssues = async () => {
    const response = await api.asUser().requestJira(route`/rest/api/3/search`);
    const data = await response.json();
    return data;
};

const App = ()  => {

    const [issues] = useState( async () => await fetchIssues());
    return (
        <Fragment>
            <Text>Issues in MetriKa project</Text>
            <Text>Issues total count {issues.total} </Text> 
            <Text>Issues assignee: </Text>
            
           {/* show the issue key if the field hass an assignee */}

            {issues.issues.map(issue => {
                if (issue.fields.assignee) {
                    return  (
                        <Text>{issue.key} -  {issue.fields.assignee.displayName} ✅</Text>
                    )
                }
            })}
        </Fragment>
    );
};

export const run = render(
    <ProjectPage>
        <App />
    </ProjectPage>
);
