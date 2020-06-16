import { Blog } from './../entity/Blog';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';


class BlogController {

    public static getAll = (req: Request, res: Response) => {
        const blogRepository = getRepository(Blog);

        blogRepository.find().then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }

    public static getSingleBlog = async (req: Request, res: Response) => {
        const { id } = req.params;
        console.log(id);
        const blogRepository = getRepository(Blog);
        // const blog = await blogRepository.findOne({select:['title', 'description'], where: { id }}).catch((error) => res.status(500).send(error)); //DISPLAY ONLY TITLE AND DESCRIPTION
        const blog = await blogRepository.findOne(id).catch((error) => res.status(500).send(error)); //DISPLAY ALL Elements of the object
        if(blog){ 
            res.status(200).send(blog);
        }else{
            res.status(404).send({message: "Error!"})
        }
    }

    public static createBlog = async (req: Request, res: Response) => {
        const { title, description, datePosted } = req.body;
        const blogRepository = getRepository(Blog);
        const blog = new Blog();


        blog.title = title;
        blog.description = description;
        blog.datePosted = datePosted;

        blogRepository.save(blog).then((data) => {
            res.status(201).send({message: 'Blog Created', data});
        }).catch((error) => {
            res.status(500).send(error);
        });
    }

    public static updateBlog = async (req: Request, res: Response) => {

        const { id } = req.params;

        const blogRepository = getRepository(Blog);

        const blog = await blogRepository.findOne(id).catch((error) => res.status(500).send(error));
        blogRepository.merge(blog, req.body);
        const result = await blogRepository.save(blog).catch((error) => res.status(500).send(error));
        if(blog){
            res.status(200).send(result);
        }else{
            res.status(400).send({message: "Cannot Update Blog"});
        }
    }

    public static deleteBlog = async (req: Request, res: Response) => {
        const { id } = req.params;
        const blogRepository = getRepository(Blog);
        blogRepository.findOne(id).then(async (blog) => {
            if(blog) {
                const deletedBlog = await blogRepository.delete(blog);
                res.status(200).send(deletedBlog);
            } else {
                res.status(404).send({ message: "blog not found"});
            }
           
       }).catch((error) => {
               res.status(500).send(error);
       });
    }
}

export default BlogController;