mapboxgl.accessToken = 'pk.eyJ1IjoiZGF5YW4xNTMiLCJhIjoiY2x6a2RmazgxMGw2YzJscTBuOG10anpqbCJ9.vyxnkLvWkCyhzi07ew4HqQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-55.491477, -13.673179],
    zoom: 3,
    interactive: false // Desabilitar interação do mouse
});

// Funções para mover o mapa para diferentes posições e zooms
const flyToPosition = (center, zoom) => {
    map.flyTo({
        center: center,
        zoom: zoom,
        essential: true
    });
};

// Função para adicionar uma camada GeoJSON ao mapa
const addGeoJsonLayer = (map, id, data, color) => {
    if (map.getSource(id)) {
        map.getSource(id).setData(data);
    } else {
        map.addSource(id, {
            type: 'geojson',
            data: data
        });

        map.addLayer({
            id: id,
            type: 'line',
            source: id,
            paint: {
                'line-color': color,
                'line-width': 2
            }
        });
    }
};

// Função para adicionar uma camada de preenchimento GeoJSON ao mapa
const addGeoJsonFillLayer = (map, id, data, color) => {
    if (map.getSource(id)) {
        map.getSource(id).setData(data);
    } else {
        map.addSource(id, {
            type: 'geojson',
            data: data
        });

        map.addLayer({
            id: id,
            type: 'fill',
            source: id,
            paint: {
                'fill-color': color,
                'fill-opacity': 0.5
            }
        });
    }
};

// Carregar os dados GeoJSON do Brasil, Distrito Federal e Maranhão
const brasilGeoJsonUrl = 'geojson/brasil.geojson';
const dfGeoJsonUrl = 'geojson/distrito_federal.geojson';
const maGeoJsonUrl = 'geojson/maranhao.geojson';
const piGeoJsonUrl = 'geojson/piaui.geojson';

fetch(brasilGeoJsonUrl)
    .then(response => response.json())
    .then(data => {
        addGeoJsonLayer(map, 'brasil-border', data, '#FF0000');
    });

fetch(dfGeoJsonUrl)
    .then(response => response.json())
    .then(data => {
        addGeoJsonLayer(map, 'df-border', data, '#0000FF');
    });

fetch(maGeoJsonUrl)
    .then(response => response.json())
    .then(data => {
        addGeoJsonLayer(map, 'ma-border', data, '#00FF00');
    });

fetch(piGeoJsonUrl)
    .then(response => response.json())
    .then(data => {
        addGeoJsonLayer(map, 'pi-border', data, '#00FF00');
    });

const stateCenters = {
    'df': [-47.9292, -15.7801], // Coordenadas de Brasília
    'ma': [-48.2971, -4.9609], // Coordenadas de São Luís, Maranhão
    'pi': [-46.8016, -6.5983]  // Coordenadas de Teresina, Piauí
};

const zoomLevels = {
    'df': 8, // Nível de zoom para o Distrito Federal
    'ma': 5.5,  // Nível de zoom para o Maranhão
    'pi': 6   // Nível de zoom para o Piauí
};

function zoomToState(state) {
    const center = stateCenters[state];
    const zoom = zoomLevels[state];
    if (center && zoom) {
        map.flyTo({
            center: center,
            zoom: zoom,
            essential: true
        });
    }

    // Ajustar visibilidade das bordas dos estados
    const borders = ['brasil-border', 'df-border', 'ma-border', 'pi-border'];
    borders.forEach(border => map.setLayoutProperty(border, 'visibility', 'none'));

    if (state === 'df') {
        map.setLayoutProperty('df-border', 'visibility', 'visible');
    } else if (state === 'ma') {
        map.setLayoutProperty('ma-border', 'visibility', 'visible');
    } else if (state === 'pi') {
        map.setLayoutProperty('pi-border', 'visibility', 'visible');
    }
}

// Maiores estados em acessos em 2011
const estadosMaioresAcessos2011 = [
    { id: 'df', geoJsonUrl: 'geojson/distrito_federal.geojson' },
    { id: 'sp', geoJsonUrl: 'geojson/sao_paulo.geojson' },
    { id: 'rj', geoJsonUrl: 'geojson/rio_de_janeiro.geojson' },
    { id: 'sc', geoJsonUrl: 'geojson/santa_catarina.geojson' },
    { id: 'pr', geoJsonUrl: 'geojson/parana.geojson' }
];

// Função que preenche os estados com maior número de acessos em 2011
estadosMaioresAcessos2011.forEach(estado => {
    fetch(estado.geoJsonUrl)
        .then(response => response.json())
        .then(data => {
            addGeoJsonFillLayer(map, `${estado.id}-fill`, data, '#00FF00');
        });
});

// Estados com menor número de acessos em 2011
const estadosMenoresAcessos2011 = [
    { id: 'ma', geoJsonUrl: 'geojson/maranhao.geojson' },
    { id: 'pi', geoJsonUrl: 'geojson/piaui.geojson' },
    { id: 'pa', geoJsonUrl: 'geojson/para.geojson' },
    { id: 'al', geoJsonUrl: 'geojson/alagoas.geojson' },
    { id: 'ce', geoJsonUrl: 'geojson/ceara.geojson' }
];
// Fu
estadosMenoresAcessos2011.forEach(estado => {
    fetch(estado.geoJsonUrl)
        .then(response => response.json())
        .then(data => {
            addGeoJsonFillLayer(map, `${estado.id}-fill`, data, '#FF0000'); // Red color
        });
});

// Mostar ou ocultar as bordas de todos os estados
const estados = [
    'acre', 'alagoas', 'amapa', 'amazonas', 'bahia', 'ceara', 'distrito_federal', 'espirito_santo', 
    'goias', 'maranhao', 'mato_grosso', 'mato_grosso_do_sul', 'minas_gerais', 'para', 'paraiba', 
    'parana', 'pernambuco', 'piaui', 'rio_de_janeiro', 'rio_grande_do_norte', 'rio_grande_do_sul', 
    'rondonia', 'roraima', 'santa_catarina', 'sao_paulo', 'sergipe', 'tocantins'
];

const bordersTodosEstados = estados.map(estado => ({ id: estado, geoJsonUrl: `geojson/${estado}.geojson` }));
// Adicionar as bordas de todos os estados ao mapa
bordersTodosEstados.forEach(estado => {
    fetch(estado.geoJsonUrl)
        .then(response => response.json())
        .then(data => {
            addGeoJsonLayer(map, `${estado.id}-border`, data, '#FF0000');
        });
});

// F
const toggleAllStateBorders = (visible) => {
    bordersTodosEstados.forEach(estado => {
        map.setLayoutProperty(`${estado.id}-border`, 'visibility', visible ? 'visible' : 'none');
    });
};

// Inclinação e movimento do mapa
const tiltMap = (bearing, pitch) => {
    map.easeTo({
        bearing: bearing,
        pitch: pitch,
        duration: 2000
    });
};

// Eventos de mouse para mostrar ou ocultar as bordas dos estados
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseenter', () => {
        const id = section.id.split('-')[1];
        if (id === 'overview') {
            map.easeTo({
                center: [-50.491477, -13.673179],
                zoom: 3,
                bearing: 0,
                pitch: 0,
                duration: 2000
            });
            // flyToPosition([-50.491477, -13.673179], 3);
            map.setLayoutProperty('brasil-border', 'visibility', 'visible');
            map.setLayoutProperty('df-border', 'visibility', 'none');
            map.setLayoutProperty('ma-border', 'visibility', 'none');
            map.setLayoutProperty('pi-border', 'visibility', 'none');
            estadosMaioresAcessos2011.forEach(estado => {
                map.setLayoutProperty(`${estado.id}-fill`, 'visibility', 'none');
            })
            estadosMenoresAcessos2011.forEach(estado => {
                map.setLayoutProperty(`${estado.id}-fill`, 'visibility', 'none');
            });
            toggleAllStateBorders(false);
        } else if (id === '2005') {
            flyToPosition(stateCenters['df'], zoomLevels['df']);
            toggleAllStateBorders(false);
            map.setLayoutProperty('df-border', 'visibility', 'visible');
            map.setLayoutProperty('ma-border', 'visibility', 'visible');
        } else if (id === '2006') {
            flyToPosition(stateCenters['df'], zoomLevels['df']);
            toggleAllStateBorders(false);
            map.setLayoutProperty('df-border', 'visibility', 'visible');
            map.setLayoutProperty('pi-border', 'visibility', 'visible');
        } else if (id === 'maiores2011') {
            flyToPosition([-40.491477, -22.673179], 5); // Ajuste a posição e o zoom conforme necessário
            map.setLayoutProperty('ma-border', 'visibility', 'none');
            map.setLayoutProperty('pi-border', 'visibility', 'none');
            map.setLayoutProperty('brasil-border', 'visibility', 'visible');
            estadosMaioresAcessos2011.forEach(estado => {
                map.setLayoutProperty(`${estado.id}-fill`, 'visibility', 'visible');
            });
            estadosMenoresAcessos2011.forEach(estado => {
                map.setLayoutProperty(`${estado.id}-fill`, 'visibility', 'none');
            });
            toggleAllStateBorders(true);
        } else if (id === 'menores2011') {
            flyToPosition([-55.491477, -5.673179], 4.8); // Adjust position and zoom as needed
            toggleAllStateBorders(true); // Show borders for all states
            estadosMenoresAcessos2011.forEach(estado => {
                map.setLayoutProperty(`${estado.id}-fill`, 'visibility', 'visible');
            });
            estadosMaioresAcessos2011.forEach(estado => {
                map.setLayoutProperty(`${estado.id}-fill`, 'visibility', 'none');
            });
        } else if (id === 'explanation') {
            map.easeTo({
                center: [-105.491477, -14.673179],
                zoom: 3,
                bearing: 0,
                pitch: 30,
                duration: 2000
            });
            map.setLayoutProperty('brasil-border', 'visibility', 'visible');
            map.setLayoutProperty('df-border', 'visibility', 'none');
            map.setLayoutProperty('ma-border', 'visibility', 'none');
            map.setLayoutProperty('pi-border', 'visibility', 'none');
            estadosMaioresAcessos2011.forEach(estado => {
                map.setLayoutProperty(`${estado.id}-fill`, 'visibility', 'none');
            })
            estadosMenoresAcessos2011.forEach(estado => {
                map.setLayoutProperty(`${estado.id}-fill`, 'visibility', 'none');
            });
            toggleAllStateBorders(true);
            
        }
    });
});

// Função para mover o mapa lentamente para a esquerda
