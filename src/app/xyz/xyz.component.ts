
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Movie {
  title: string;
  releaseDate: string;
  originalLanguage: string;
  overview: string;
  imageUrl: string;
}

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})

export class XyzComponent {
  movies: Movie[] =[];
  searchText = '';

  filteredMovies: Movie[] = [];
  selectedMovieIndex: number | null = null;


  constructor(private http: HttpClient) {
    this.http.get<any>('https://api.themoviedb.org/3/movie/popular?api_key=5ef7401ad99ab2dcf518714b7f630e74')
      .subscribe(response => {
        this.movies = response.results.map((movie: any) => ({
          title: movie.title,
          releaseDate: movie.release_date,
          originalLanguage: movie.original_language,
          overview: movie.overview,
          imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        }));
        this.filteredMovies = this.movies;
      });
  }
  

  onSearchInput() {
    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  onMovieSelected(index: number) {
    this.selectedMovieIndex = index;
  }
}
