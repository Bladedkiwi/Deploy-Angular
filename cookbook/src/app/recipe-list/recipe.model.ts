/**
 * Recipe Model
 * The template for a recipe including its name, ingredients, description, and imgPath
 */
export class Recipe {
  public name: string;
  public ingredients: string[];
  public description: string;
  public imgPath: string;

  constructor(name: string, description: string, imgPath: string, ingredients: string[]) {
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.ingredients = ingredients;
  }
}
