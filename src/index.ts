/// <reference types="@types/google.maps" />
import { User } from "./User";
import { Company } from "./Company";

//optional argument signified by opts? in hovering over .Map class
// go to docs with cmd click and find we can pass in an object that looks like MapOptions interface which is defined in the google maps type definition file
new google.maps.Map(document.getElementById("map") as HTMLElement, {
  zoom: 1,
  center: { lat: 0, lng: 0 },
});
