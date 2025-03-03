import type { AvailableTechCMS } from "./cms.model";
import type { TrailerModel } from "./trailer.model";

export interface MovieModel {
    id: string;
    HOFilmCode: string;
    corporateFilmId: string;
    posterImage: string;
    title: string;
    titleCalculated: string;
    titleOriginalCalculated: string;
    descriptionCalculated: string;
    descriptionShortCalculated: string;
    trailers: TrailerModel[];
    director: string;
    directors: string[];
    actors: string[];
    startDate: string;
    openingDate: string;
    genres: string[];
    genreId: string;
    comingSoon: boolean;
    isScheduledAtCinema: boolean;
    rating: string;
    ratingDescription: string;
    runTime: number;
    gallery: string[];
    teachingMaterials: any[];
    cinemaIds: string[];
    technologies: any[];
    availableTechCMS: AvailableTechCMS[];
    availableVersCMS: any[];
    movieCountryCMS: string[];
    keywords: string[];
    distributorName: string;
    shortURL: string;
    synopsis: string;
    shortSynopsis: string;
}  