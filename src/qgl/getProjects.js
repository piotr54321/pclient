import {gql} from 'apollo-boost';

export const GET_PROJECTS = gql`
    query getProjects($id: Int, $limit: Int, $offset: Int){
        GetProjects(where: {id: $id}, limit: $limit, offset: $offset){
            id,
            title, 
            description, 
            short_description, 
            url, 
            other_info
        }
    }
`;


export const GET_PROJECTS_EXTENDED_INFO = gql`
    query getProjects($id: Int, $limit: Int, $offset: Int){
        GetProjects(where: {id: $id}, limit: $limit, offset: $offset){
            id,
            title,
            description,
            short_description,
            url,
            other_info,
            projects_technologies{
                technology{
                    name
                }
            },
            projects_images{
                projects_id,
                image_filename,
                main,
                alt
            }
        }
    }
`;
