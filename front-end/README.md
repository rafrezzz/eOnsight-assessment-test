# FrontEnd

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files. 

**Note:** Ensure your local backend bridges API is running to display the bridge-related data properly.


## Handling Hubeau API Issues  

As of January 12, 2025, the Hubeau API has been experiencing issues, making it non-functional. To ensure the application remains operational, JSON data has been added to the public folder to simulate the API responses.

### Key Adjustments :

- Parts of the application have been modified to use these local JSON files as a fallback.
- The original code for API interaction has been preserved and is commented out for future use.

### Switching Back to the API

If the Hubeau API becomes operational again:

- Uncomment the original code for API interaction

- Comment out the fallback code using the JSON files

- The app should then function correctly with real-time API data