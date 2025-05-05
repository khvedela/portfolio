import './style.css'
import ReactDOM from 'react-dom/client'
import {Canvas} from '@react-three/fiber'
import {Perf} from "r3f-perf";
import {OrbitControls} from "@react-three/drei";
import Layout from "./components/Layout.jsx";
import Landing from "./components/Landing.jsx";
import {useControls} from "leva";

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Layout>
        <Landing/>
    </Layout>
)