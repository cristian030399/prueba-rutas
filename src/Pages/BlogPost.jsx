import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { blogdata } from '../common/blogdata';
import { roles, useAuth } from '../common/auth';

function BlogPost() {
    const { slug } = useParams();
    const auth = useAuth()
    const navigate = useNavigate()
    const blogPost = blogdata.find(post => post.slug === slug)

    const canDelete = auth.user?.role === roles.admin ||
        blogPost.author === auth.user?.username
    const canEdit = auth.user?.role === roles.editor ||
        auth.user?.role === roles.admin

    const returnToBlog = () => {
        navigate('/blog')
    }

    const goToEditPage = () => {
        navigate(`/blog/edit/${slug}`)
    }

    return (
        <>
            <h2>{blogPost.title}</h2>
            <button onClick={returnToBlog}>Volver al blog</button>
            <p>{blogPost.author}</p>
            <p>{blogPost.content}</p>
            {canEdit && (
                <button onClick={goToEditPage}>Editar blogpost</button>
            )}
            <button onClick={goToEditPage}>Prueba</button>
            {canDelete && (
                <button>Eliminar blogpost</button>
            )}

        </>
    )
}



export { BlogPost }