'use strict';
class Pizza {
    constructor(size, type) {
        this.extraIngredientsList = [];
        this.allowedExtraIngredients = Pizza.allowedExtraIngredients.length
            ? Pizza.allowedExtraIngredients : [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_MEAT, Pizza.EXTRA_CHEESE];
        this.allowedSizes = Pizza.allowedSizes.length
            ? Pizza.allowedSizes : [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
        this.allowedTypes = Pizza.allowedTypes.length
            ? Pizza.allowedTypes : [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];

        if (arguments.length !== 2) {
            throw new PizzaExeption('Required 2 arguments, got :' + arguments.length);
        }
        console.log('allowedSizes', this.allowedSizes)
        console.log('size', size)
        if (!this.allowedSizes.includes(size)) {
            throw new PizzaExeption('Invalid size');
        }

        if (!this.allowedTypes.includes(type)) {
            throw new PizzaExeption('Invalid type');
        }

        this.size = size;
        this.type = type;
    }

    addExtraIngredient(ingridient) {
        if (arguments.length > 1) {
            throw new PizzaExeption('Required two arguments, given:' + arguments.length);
        }

        if (!this.allowedExtraIngredients.includes(ingridient)) {
            throw new PizzaExeption('Invalid ingredient');
        }

        if (this.extraIngredientsList.includes(ingridient)) {
            throw new PizzaExeption('Duplicate ingredient');
        }

        this.extraIngredientsList.push(ingridient);
    }

    removeExtraIngredient(ingridient) {
        if (arguments.length > 1) {
            throw new PizzaExeption('Required two arguments, given: ' + arguments.length);
        }

        if (!this.allowedExtraIngredients.includes(ingridient)) {
            throw new PizzaExeption('Invalid ingredient');
        }

        if (!this.extraIngredientsList.includes(ingridient)) {
            throw new PizzaExeption('Duplicate ingredient');
        }

        this.extraIngredientsList = this.extraIngredientsList
            .filter(existingIngerdient => existingIngerdient !== ingridient);
    }

    getSize() {
        return this.type;
    }

    getPrice() {
        const extraIngedientsPrice = this.extraIngredientsList.reduce((acc, curr) => {
            return acc + curr
        }, 0)
        return this.size + this.type + extraIngedientsPrice;
    }

    getPizzaInfo() {
        let formatedSize = '';
        switch (this.size) {
            case Pizza.SIZE_S: formatedSize = 'SMALL'; break;
            case Pizza.SIZE_M: formatedSize = 'MEDIUM'; break;
            case Pizza.SIZE_L: formatedSize = 'LARGE'; break;
            default: break;
        }
        return `Size: ${formatedSize}, type: ${this.getFormatedData('TYPE_', this.type)};`
            + ` extra ingredients: ${this.getExtraIngredients().join(', ')};`
            + ` price: ${this.getPrice()} UAH.`
    }

    getFormatedData(key, value) {
        return Object.entries(Pizza).filter((entries) => {
            return entries[0].includes(key);
        }).find((entries) => entries[1] === value)[0].slice(key.length)
    }

    getExtraIngredients() {
        return this.extraIngredientsList.map(ingredient => this.getFormatedData('EXTRA_', ingredient));
    }
}

class PizzaExeption {
    constructor(log) {
        console.error(log);
    }
}

Pizza.SIZE_S = 50;
Pizza.SIZE_M = 75;
Pizza.SIZE_L = 100;

Pizza.TYPE_VEGGIE = 50;
Pizza.TYPE_MARGHERITA = 60;
Pizza.TYPE_PEPPERONI = 70;

Pizza.EXTRA_TOMATOES = 7;
Pizza.EXTRA_CHEESE = 5;
Pizza.EXTRA_MEAT = 9;

Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];
Pizza.allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_MEAT, Pizza.EXTRA_CHEESE];