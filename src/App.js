import React, { useState } from "react";
import Select from 'multiselect-react-dropdown';
import './app.css';

// my current variable list
var myList= [
  { id: '1', value: 'Shark' },
  { id: '2', value: 'Dolphin' },
  { id: '3', value: 'Whale' },
  { id: '4', value: 'Octopus' },
  { id: '5', value: 'Crab' },
  { id: '6', value: 'Lobster' }];


// the current variable list will have only numbers randing from 1 to 6. Change the value of 'len' to handle
//  more items of the drop-down and uncomment the following lines of code:
/*
var len = 4000;
for ( var i = 7; i < len; i++ ) {
  myList.push({id: i, value: ''});
}
*/

var len = myList.length;

export default function App() {
  

  const [limit, setLimit] = useState( len );
  const [temp, setTemp] = useState(0);
  const [message, setMessage] = useState( "Select" );
  const [all, setAll] = useState(false);
  const [def, setDef] = useState(true);

  return (
    <>
      <div className="title"> My Task </div>
      <div className="inpBox">
        {/* selection input limit */}
        <input className="input" type="int" onChange={m => {setLimit(m.target.value); setTemp(m.target.value)}} placeholder={limit} />
      </div>
      <div className="both">
        {/* select all button */}
        <button className="button-1"
        onClick={ () => {
          if ( limit >= len ) {
            console.log("Got here");
            console.log(limit);
            setMessage( "Selected All " + limit );
            setTemp( limit );
            setAll( true );
            setDef( false );
          } else {
            console.log(limit );
            console.log( len );
            setMessage("ERROR: Not Enough Values");
            setTemp( limit );
            setLimit( 0 );
          }
        }}> Select All </button>

        {/* deselect all button */}
        <button className="button-2"
        onClick={ () => {
          setAll( true );
          setAll( false );
          setDef( false );
          setMessage( "Select" );
          if ( !limit ) {
            setLimit( temp );
          }
          
        }}> Deselect All </button>
      </div>
      
      <p className="placeH"> {message} </p>
      {/* dropdown div */}
      <div className="select" key="id">
        <Select
          
          key="id"
          options={myList}
          displayValue= "id"
          selectedValues={def ? [{ id: '1', value: 'Shark'}]:(all ? myList : [])}
          onKeyPressFn={function noRefCheck(){}}
          onSearch={function noRefCheck(){}}

          // select the item
          onSelect={ ( selectedList ) => {
            // setDef(false);

            if ( selectedList.length == 0 ) {
              setMessage("Select");
            } else if ( selectedList.length == limit ) {
              if ( limit == myList.length ) {
                setAll( true );
              }
              setMessage("ERROR: Limit Reached");
            } else {
              var rest = limit - selectedList.length;
              setMessage( rest + " item" + (( rest == 1 )? '': 's') +" remaining");
            }
          }}

          // deselect the item
          onRemove={ ( selectedList, selectedItem ) => {
            console.log( "limit is: " + limit );
            console.log( "length is: " + selectedList.length );
            console.log( "all is: " + all );
            console.log( selectedItem );

            if ( !all && selectedList.length == 0 ) {
              setMessage( "Select" );
            } else if ( !all && selectedList.length == limit ) {
              setMessage( "ERROR: Limit Reached" );
            } else {
              var rest = limit - selectedList.length;
              console.log( limit );
              console.log( selectedList.length );
              console.log( "Rest:" +  rest );
              setMessage( rest + " item" + (( rest == 1 )? '': 's') +" remaining");
            }
            if ( def && selectedItem.id === '1' ) { setDef(false); }
            if ( selectedList.length == 0 ) { setAll(false); }
          }}
          
          selectionLimit={limit}
          placeholder=""
          showCheckbox
          showArrow
          style={{
            chips: {
              background: 'black'
            },
            optionContainer: {
              color: 'green'
            },
            option: {
              color: 'white'
            }
          }}
        />
      </div>

      <div className="both">
        {/* select all button */}
        <button className="button-1"
        onClick={ () => {
          if ( limit >= len ) {
            console.log("Got here");
            console.log(limit);
            setMessage( "Selected All " + limit );
            setTemp( limit );
            setAll( true );
            setDef( false );
          } else {
            console.log(limit );
            console.log( len );
            setMessage("ERROR: Not Enough Values");
            setTemp( limit );
            setLimit( 0 );
          }
        }}> Select All </button>

        {/* deselect all button */}
        <button className="button-2"
        onClick={ () => {
          setAll( true );
          setAll( false );
          setDef( false );
          setMessage( "Select" );
          if ( !limit ) {
            setLimit( temp );
          }
          
        }}> Deselect All </button>
      </div>
    </>
  );
}
