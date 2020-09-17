import React from 'react'
import Layout from '../../components/Layout'
import {useRouter} from 'next/router'
import { MDBContainer } from 'mdbreact';

export const getStaticProps = async ({params}) => {
    const data = await fetch(`https://joygaringo-admin.herokuapp.com/blogs/${params.id}`);
    const blog = await data.json();
    return {
        props: {
            blog
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch('https://joygaringo-admin.herokuapp.com/blogs')
    const blogs = await res.json();
    return {
        paths: blogs.map(({ id }) => ({
            params: { id }
        })),
        fallback: true
    }
}

const SingleBlog = ({blog}) => {
    const router = useRouter();
    if(router.isFallback && !blog?.slug){
        return <p>Error 404</p>
    }

    return (
        <Layout page={blog.title}>
            <MDBContainer>
                <h1>{blog.title}</h1>
                <p className="lead">
                    {blog.content}
                </p>
            </MDBContainer>
        </Layout>
    )
}

export default SingleBlog