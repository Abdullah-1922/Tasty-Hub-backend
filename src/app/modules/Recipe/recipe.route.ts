import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";


import { RecipeValidationSchema } from "./recipe.validation";
import { RecipeControllers } from "./recipe.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.utils";
// import auth from "../../middlewares/authValidation";

const router = Router();

router.post(
  "/create-recipe",
  // auth(),
  validateRequest(RecipeValidationSchema.CreateRecipeValidationSchema),
  RecipeControllers.createRecipe,
);
router.get("/",auth(USER_ROLE.admin,USER_ROLE.user), RecipeControllers.getAllRecipe);
router.patch("/toggle-status/:recipeId", RecipeControllers.togglePublishStatus);

router.get("/user/:userId", RecipeControllers.getRecipeForUser);
router.get("/:id", RecipeControllers.getSingleRecipe);
router.delete("/:id", RecipeControllers.deleteRecipe);
router.patch("/rating/:recipeId", RecipeControllers.createRating);
router.patch("/:id", RecipeControllers.updateRecipe);

export const RecipeRoutes = router;
