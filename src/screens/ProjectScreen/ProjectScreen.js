// @flow

import React from 'react';
import {Body, Card, CardItem, Container, Text} from 'native-base';
import {connect} from 'react-redux';
import {fetchSingleProject} from "../../redux/actions/projects";
import {ActivityIndicator, StyleSheet} from "react-native";
import LogoutButton from "../../components/LogoutButton";

class ProjectsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title || '',
        headerRight: <LogoutButton/>
    });

    componentDidMount() {
        const {id} = this.props.navigation.state.params;
        if (id) {
            this.props.fetchSingleProject(id)
                .then(
                    ({name}) => {
                        this.props.navigation.setParams({
                            title: name
                        });
                    }
                );
        } else {
            this.props.navigation.navigate('Projects');
        }
    }

    render() {
        const {project, fetchingProject} = this.props;

        if (fetchingProject) {
            return (
                <Container style={styles.container}>
                    <ActivityIndicator/>
                </Container>
            );
        }

        if (!project) {
            return (
                <Container style={styles.container}>
                    <Text>No project found :(</Text>
                </Container>
            );
        }

        return (
            <Container>
                <Card>
                    {project.description && (
                        <CardItem>
                            <Body>
                                <Text>{project.description}</Text>
                            </Body>
                        </CardItem>
                    )}
                </Card>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => ({
    project: state.projects.single,
    fetchingProject: state.projects.requests.fetchSingleProject.isLoading
});

const mapDispatchToProps = {
    fetchSingleProject
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen);
