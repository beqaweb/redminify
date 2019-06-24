// @flow

import React from 'react';
import {Container, List, ListItem, Text} from 'native-base';
import {connect} from 'react-redux';
import {fetchProjects} from "../../redux/actions/projects";
import LogoutButton from "../../components/LogoutButton";

class ProjectsScreen extends React.Component {
    static navigationOptions = {
        title: 'Projects',
        headerRight: <LogoutButton/>
    };

    componentDidMount() {
        this.props.fetchProjects();
    }

    projectClicked = (id) => () => {
        this.props.navigation.navigate('Project', {id});
    };

    render() {
        return (
            <Container>
                <List>
                    {this.props.projects.map(({id, name}) => (
                        <ListItem key={id} onPress={this.projectClicked(id)}>
                            <Text>{name}</Text>
                        </ListItem>
                    ))}
                </List>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    projects: state.projects.items,
    fetchingProjects: state.projects.requests.fetchProjects.isLoading
});

const mapDispatchToProps = {
    fetchProjects
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen);
