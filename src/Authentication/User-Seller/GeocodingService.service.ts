
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeocodingServiceService {
    private apiKey: string = "acfcd3fd265248359b3d29721527c15d";
     async getCoordinates(address: string) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address,
    )}&key=${this.apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.results.length > 0) {
      return {
        lat: data.results[0].geometry.lat,
        lng: data.results[0].geometry.lng,
      };
    }
    return null;
  }
}
