import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { blogdata } from '../common/blogdata';

function BlogPage() {
    return (
        <>
            <h1>BlogPage</h1>
            <ul>
                {blogdata.map(post => (
                    <BlogLink post={post} key={post.slug}/>
                ))}
            </ul>
            <div>
                <Outlet />
            </div>
        </>
    )
}

function BlogLink({post}) {
    return (
        <li>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
    )
}

export { BlogPage }