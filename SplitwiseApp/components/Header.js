import React, {useEffect} from 'react';
import Svg, { Path } from "react-native-svg"
import ExpenseItem from "./SplitItem";
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import VaultShare from "../assets/VaultShare.svg"

export default function Header(props) {
    return (
        <Layout style={{height: "15%", backgroundColor: "#F7ADFF"}} level='1'>
    <Svg
    // paddingTop="100mm"
      top="-40%"
      width="100%"
      height="400%"
      viewBox="0 0 210 297"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M91.136 30.542l26.162.008 8.077 24.884-21.17 15.371-21.161-15.384zM174.594 91.351l-25.911-3.615-4.57-25.76 23.088-12.305 18.838 18.154zM34.793 91.351l25.911-3.615 4.57-25.76-23.088-12.305-18.838 18.154zM32.902 168.499l25.911 3.615 4.57 25.76-23.088 12.305-18.838-18.154zM176.485 168.499l-25.912 3.615-4.569 25.76 23.088 12.305 18.837-18.154zM206.375 118.666l-24.875-8.105-15.395 21.154 15.361 21.177 24.888-8.064zM1.829 118.333l24.875-8.104 15.394 21.153-15.36 21.178-24.888-8.065zM90.791 231.682l26.162-.008 8.077-24.884-21.17-15.371-21.161 15.384z"
        fill="#7e7e7e"
      />
      <Path
        d="M182.643 162.108l-45.66 44.676-64.577.006-45.668-44.666-.007-63.174L72.39 54.274l64.578-.006 45.668 44.666z"
        fill="#909090"
      />
      <Path
        d="M179.267 160.705l-43.676 42.69-61.773.006-43.685-42.681-.006-60.367 43.676-42.69 61.773-.006 43.684 42.681z"
        fill="#616161"
      />
      <Path
        fill="#c333ff"
        d="M13.954 203.328l167.64-167.885 7.834 25.603-167.64 167.886z"
      />
      <Path
        fill="#dc66ff"
        d="M18.446 205.848L179.958 44.1l7.548 24.667-161.512 161.75z"
      />
    </Svg>
        </Layout>
    )
}