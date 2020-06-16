import { User } from './../entity/User';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as Cryptr from 'cryptr';
import * as _bcrypt from 'bcrypt'
import * as _jwt from 'jsonwebtoken';
import * as config from '../config/config.js'





class UserController {

    public static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const user = await userRepository.find().catch((error) => res.status(500).send(error));

        if(user){
            res.status(200).send(user);
        }else{
            res.status(400).send({message: "Error"});
        }
    }

    public static getOne = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(id).catch((error) => res.status(500).send(error));
        if(user){
            res.status(200).send(user);
        }else{
            res.status(400).send({message: "Error"});
        }
    }

    public static createUser = async (req: Request, res: Response) => {
        const { username, password, firstName, lastName, age } = req.body;
        const userRepository = getRepository(User);
        const user = new User();
     _bcrypt.hash(password, 10, (err, hash) => {
            if(err){
                res.status(500).send(err);
            }else{
                user.username = username;
                user.password = hash;
                user.firstName = firstName;
                user.lastName = lastName;
                user.age = age;
               const result =  userRepository.save(user).then((data) => {
                    if(result){
                        res.status(200).send({message: "User Added Sucessfully", data});
                    }else{
                        res.status(400).send({ message: "Error"});
                    }
               }).catch((error) => res.status(500).send(error));
            }
        })
    }

    public static updateUser = async(req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { id }}).catch((error) => res.status(500).send(error));
        userRepository.merge(user, req.body);
        const result = await userRepository.save(user).catch((error) => res.status(500).send(error));

        if(result){
            res.status(200).send(result);
        }else{
            res.status(400).send({ message: "Can't Update User"});
        }
    }

    public static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);

        userRepository.findOne(id).then(async (blog) => {
            if(blog) {
                const deletedUser = await userRepository.delete(blog);
                res.status(200).send(deletedUser);
            } else {
                res.status(404).send({ message: "blog not found"});
            }
           
       }).catch((error) => {
               res.status(500).send(error);
       });

    }

    public static login = async (req: Request, res: Response) => {
        const { username, password} = req.body;
        const { id } = req.params;
        const userRepository = getRepository(User); 
        userRepository.findOne({select: ['username', 'password'], where: { username }}).then(async (user) => {
            const match = _bcrypt.compare(password, user.password);
            if(match){
                let token = _jwt.sign({username: username}, 
                    config.secret,
                        { expiresIn: '24h'}
                    );
                    res.json({
                        success: true,
                        message: 'Login Successfully',
                        token: token
                    });
            }else{
                res.status(400).send({message: "Login Failed! Incorrect Username or password"})
            }
        });
    }


    public static changePassword = async(req: Request, res: Response) => {
        const { username, password} = req.body;
        const userRepository = getRepository(User);

        userRepository.findOne(username).then((data) => {
            
        });
    }



}

export default UserController;