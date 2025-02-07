import { createUser } from 'Core/Application/useCases/createUser';
import { Request, Response } from 'express';

export const createUserController = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  try {
    const user = await createUser({ email, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};