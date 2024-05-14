package com.sporzvous.backend.Places;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/places")
public class PlacesController {

    private static final String PLACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

    @GetMapping("/countries")
    public String getCountries() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://restcountries.com/v3.1/all";
        return restTemplate.getForObject(url, String.class);
    }

    @GetMapping("/cities")
    public String getCitiesByCountry(@RequestParam String country) {
        String apiKey = "emreerol0";  // Replace with your actual API key
        String url = "http://api.geonames.org/searchJSON?formatted=true&country=" + country + "&username=" + apiKey + "&style=full";
        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.getForObject(url, String.class);
    }

}