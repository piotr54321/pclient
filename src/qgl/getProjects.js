import { gql } from 'apollo-boost';

export const GET_PROJECTS = gql`
    query getProjects($id: Int){
        GetProjects(where:{id: $id}){
            id, title, description, url, projects_technologies{
                technology{
                    name
                }
            },
            projects_images{
                image_filename,
                main
            }
        }
    }
`;
