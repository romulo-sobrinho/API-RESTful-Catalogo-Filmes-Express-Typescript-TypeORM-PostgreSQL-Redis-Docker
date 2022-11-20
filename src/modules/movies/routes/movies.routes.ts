import { Router } from 'express';
import MoviesController from '../controllers/MoviesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';

const moviesRouter = Router();

const moviesController = new MoviesController();

moviesRouter.get('/', isAuthenticated, moviesController.index);

moviesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  isAuthenticated,
  moviesController.show
);

moviesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      genre: Joi.string().required(),
      url_image: Joi.string().required(),
    }
  }),
  isAuthenticated,
  moviesController.create
);

moviesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      genre: Joi.string().required(),
      url_image: Joi.string().required(),
    }
  }),
  isAuthenticated,
  moviesController.update
);

moviesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  isAuthenticated,
  moviesController.delete
);


export default moviesRouter;
