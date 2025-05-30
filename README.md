# Movi Cache API

REST API za prikaz i pretragu filmova na Srpskom jeziku napravljen za potrebe predmeta Klijentske Veb Aplikacije na Univerzitetu Singidunum

> Osnovna putanja je 'https://movie.pequla.com/api'

> Svaka putanja koja vraca listu objekata podrzava opciju `?search=` gde biste uneli tekst za pretragu

### Putanje:

- GET `/movie` - Doprema listu filmova, dostupni parameteri: `/movie?search=&actor=&genre=&director=&runtime=` gde su actor, ganre i director ID istoimenih objekata, a runtime je vrednost duzine trajanja filma
- GET `/movie/short/<short_url>` - Doprema film za short url, odnosno permalink (moze se koristit umesto movieId jer je unikatan)
- GET `/movie/runtime` - Doprema listu mogucih duzina trajanja filmova (Tip: number[])
- GET `/movie/<movieId>` - Doprema film prema ID-ju
- GET `/genre` - Doprema listu zanrova, dostupan parametar za preragu po imenu `/genre?search=`
- GET `/genre/<genreId>` - Doprema zanr objekat po ID-ju
- GET `/actor` - Doprema listu glumaca, dostupan parametar za pretragu po imenu glumca `/actor?search=`
- GET `/actor/<actorId>` - Doprema actor objekat po ID-ju
- GET `/director` - Doprema listu svih rezisera, dostupan parametar za pretragu po imenu rezisera `/director?search=`
- GET `/director/<actorId>` - Doprema reziser objekat po ID-ju
- POST `/movie/list` - Prihvata listu ID-jeva za koju ce vratiti listu istih filmova

> Ukoliko primetite potrebu za jos putanja molim Vas da mi se javite na MS Teams
