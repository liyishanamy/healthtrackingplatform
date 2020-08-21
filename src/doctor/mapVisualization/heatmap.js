import React, {Component} from 'react';
//var HeatmapOverlay = require('react-map-gl-heatmap-overlay');
//var cities = require('example-cities');
import MapGL from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import "./site.css"
import {ScatterplotOverlay} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import {errorHandling} from "../../errorHandling"; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken = "pk.eyJ1IjoieWlzaGFubGkiLCJhIjoiY2tkNG9yMWsxMXpibzMzcXlyYWIwNGp2OCJ9.5GYFPjS8WcatlnIS_S3OrQ";
const fs = require('browserify-fs');
class Heatmap extends Component {
    constructor(props) {
        super(props);
        this.state={
            userAddress:[],
            userCordinate:[],
            lng: -79.3832,
            lat: 43.6532,
            zoom: 2
        }
    }
    componentDidMount() {
        fetch("http://localhost:3000/users/address", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem("accessToken"))
            },
        }).then(response => response.json())
            .then(data => {
                if(data.message==="the token is invalid"){
                    throw data
                }
                else{
                    this.setState({
                        userAddress:data
                    },()=>{
                        for(var i=0;i<data.length;i++){
                            var searchQuery =encodeURIComponent(data[i]['street']+" "+data[i]['city']+" "+data[i]['state'])
                            fetch(`http://api.mapbox.com/geocoding/v5/mapbox.places/`+searchQuery+`.json?limit=1&country=CA&access_token=`+mapboxgl.accessToken, {
                                method: 'GET',

                            }).then(response => response.json())
                                .then(data1 => {
                                    var temp = data1["features"][0]["center"]
                                    var jsonContent = JSON.stringify(data1)
                                    //var email=data[i]["email"]
                                    this.setState(previousState=>({
                                        userCordinate:[...previousState.userCordinate,temp]
                                    }),()=>{
                                        fs.writeFile("/public/cordinate.geojson", jsonContent, 'utf8', function (err) {
                                            if (err) {
                                                console.log("An error occured while writing JSON Object to File.");
                                                return console.log(err);
                                            }
                                        });
                                    })

                                })

                }

                    })
                }
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });


        map.on('load', ()=> {
            map.addSource('userAddress', {
                "type": "geojson",
                //"data":"http://localhost:8000/cordinate.geojson",
                "data": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                           this.state.userCordinate
                        ]
                    },
                    "properties": {

                    }
                },

            });

            map.addLayer({
                'id': 'route',
                'type': 'fill',
                'source': 'userAddress',
                'layout': {

                },
                'paint': {
                    'fill-color': '#ff0000',
                    'fill-opacity': 0.8
                }
            });
        });



        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });




    }).catch( e=> errorHandling(e) );}



    render() {
        return (
            <div>
                <div className='mapContainer' >
                    <div className='sidebarStyle'>
                        <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                    </div>
                    <div ref={el => this.mapContainer = el} className='mapContainer' />
                </div>

            </div>
        );
    }
}

export default Heatmap;

