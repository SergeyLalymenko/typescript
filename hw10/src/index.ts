interface IFilm {
    name: string;
    year: number;
    rating: number;
    rewards: string[];
}

interface ICategory {
    name: string;
    films: IFilm[];
}

interface IFiltration<T extends IFilm | ICategory> extends IApplyFilters {
    filterByName(filter: string): T | undefined;
    filterByYear?(filter: number, filterTo: number): T[];
    filterByRating?(filter: number, filterTo: number): T[];
    filterByRewards?(values: string[]): T[];
}

interface IApplyFilters {
    applySearchValue?(): void;
    applyFiltersValue?(): void;
}

interface IFilms {
    films: IFilm[];
    filters: IFiltration<IFilm>;
}

interface ICategories {
    categories: ICategory[];
    filters: IFiltration<ICategory>;
}

class Films implements IFilms {
    constructor(public films: IFilm[], public filters: IFiltration<IFilm>) {}
}

class Categories implements ICategories {
    constructor(public categories: ICategory[], public filters: IFiltration<ICategory>) {}
}
