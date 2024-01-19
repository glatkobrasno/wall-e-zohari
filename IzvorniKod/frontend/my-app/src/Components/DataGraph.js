import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import {useParams} from 'react-router-dom';
//css imports
import '../styles/DataGraph.css';
//component imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'; 
//global val
import conf_back_url from "../configuration.js" 
const backURL=conf_back_url;//backend URL

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
	legend: {
	    position: "top",
	    labels: {
		font: {
                    size: 25,
                },
	    },
	},
	title: {
	    display: true,
	    text: "Konsumpcija prothklih 30 dana",
	},
    },
};

const labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

const DataGraph = () => {

    const [userData, setUserData] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [dataG, setDataG] = useState(null);
    
    useEffect(() => {
	fetchData();
    }, []);

    
    const fetchData = async () => {
	
	var userdata = JSON.parse(sessionStorage.getItem("userData"));
	setUserData(userdata);
	if (userdata) {
	    var data={
		'username' : userdata.username,
	    }
	    var res = await Axios.post(backURL+'/get_graph_data/', data);
	    console.log(res);
	    setGraphData(res.data);

	    var genE = [];
	    var genM = [];
	    var genB = [];
	    var genU = [];
	    var genS = [];
	    var genSe = [];
	
	    for (let i = 0; i < 30; i += 1) {
		genE.push(res.data[0][i].energija);
		genM.push(res.data[0][i].masnoce);
		genB.push(res.data[0][i].bjelancevine);
		genU.push(res.data[0][i].ugljikohidrati);
		genS.push(res.data[0][i].sol);
		genSe.push(res.data[0][i].seceri);
	    }
	    
	    setDataG ( {
		labels: labels,
		datasets: [{
		    label: 'Energija',
		    data: genE,
		    backgroundColor:'rgba(255, 255, 0, 1)',
		    borderWidth: 1,
		},
		{
		    label: 'Masnoće',
		    data: genM,
		    backgroundColor:'rgba(255, 255, 255, 1)',
		    borderWidth: 1,
		},
		{
		    label: 'Bjelančevine',
		    data: genB,
		    backgroundColor:'rgba(0, 0, 255, 1)',
		    borderWidth: 1,
		},
		{
		    label: 'Ugljikohidrati',
		    data: genU,
		    backgroundColor:'rgba(255, 0, 0, 1)',
		    borderWidth: 1,
		},
		{
		    label: 'Sol',
		    data: genS,
		    backgroundColor:'rgba(128, 128, 128, 1)',
		    borderWidth: 1,
		},
		{
		    label: 'Sećeri',
		    data: genSe,
		    backgroundColor:'rgba(255, 0, 255, 1)',
		    borderWidth: 1,
		},
		]
	    } );
	    
	    console.log(dataG);
	    
	}
    }

    return(
        <div className = "data_graph">
	    {userData && graphData && dataG && (
                <>
		    <div className = "graf">
			<Bar options={options} data={dataG} />
		    </div>
	        </>
            )}
        </div>
    );
    
}

export default DataGraph;
