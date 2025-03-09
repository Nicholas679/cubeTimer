
const colours = ["white","orange","green","red","blue","yellow"];
function drawSide(state,startPos,sideLength,ctx){ //This function draws each individual face 

    for (let i=0; i<3;i++){ // Two loops iterate through all 9 postions which would be on a rubiks cube face
        for (let j=0;j<3;j++){
            ctx.fillStyle = colours[Math.floor(state[i*3 +j]/9)];//gets number associated with the piece being drawn and finds the associated colour
            ctx.fillRect(startPos[0]+j*sideLength,startPos[1]+i*sideLength,sideLength,sideLength);
            ctx.strokeRect(startPos[0]+j*sideLength,startPos[1]+i*sideLength,sideLength,sideLength);
        }
    }


}
function drawState(state){ // This functions draws an image of the given Rubik's cube state
    const canvas = document.getElementById("cubeImage");
    const ctx = canvas.getContext("2d");
    const sideLength = canvas.width /12;
    drawSide(state.slice(0,9),[3*sideLength,0],sideLength,ctx); //draws each side providing the approprate section of the cube shape for each side
    drawSide(state.slice(18,27),[3*sideLength,3*sideLength],sideLength,ctx);
    drawSide(state.slice(27,36),[6*sideLength,3*sideLength],sideLength,ctx);
    drawSide(state.slice(36,45),[9*sideLength,3*sideLength],sideLength,ctx);
    drawSide(state.slice(9,18),[0,3*sideLength],sideLength,ctx);
    drawSide(state.slice(45,54),[3*sideLength,6*sideLength],sideLength,ctx);
    
}
function displayFromMoves(moves){
    
    let displayCube  = new cube(structuredClone(solvedStateDisplay));// create new solved cube object
    for (let i of moves){//apply moves
        displayCube.move(i);
    }
    drawState(displayCube.state);//display state
}
const moveList = [[[0,2],[2,8],[8,6],[6,0],[1,5],[5,7],[7,3],[3,1],[18,9],[19,10],[20,11],[9,36],[10,37],[11,38],[38,29],[37,28],[36,27],[29,20],[28,19],[27,18]],
    [[2,0],[8,2],[6,8],[0,6],[5,1],[7,5],[3,7],[1,3],[9,18],[10,19],[11,20],[36,9],[37,10],[38,11],[29,38],[28,37],[27,36],[20,29],[19,28],[18,27]],
    [[0,8],[8,0],[2,6],[6,2],[1,7],[7,1],[5,3],[3,5],[18,36],[36,18],[37,19],[19,37],[38,20],[20,38],[27,9],[9,27],[28,10],[10,28],[29,11],[11,29]],
    [[2,42],[5,39],[8,36],[36,53],[39,50],[42,47],[47,20],[50,23],[53,26],[20,2],[23,5],[26,8],[27,29],[29,35],[35,33],[33,27],[28,32],[32,34],[34,30],[30,28]],
    [[42,2],[39,5],[36,8],[53,36],[50,39],[47,42],[20,47],[23,50],[26,53],[2,20],[5,23],[8,26],[29,27],[35,29],[33,35],[27,33],[32,28],[34,32],[30,34],[28,30]],
    [[27,35],[29,33],[35,27],[33,29],[28,34],[34,28],[30,32],[32,30],[2,47],[47,2],[5,50],[50,5],[8,53],[53,8],[20,42],[42,20],[23,39],[39,23],[26,36],[36,26]],
    [[18,20],[20,26],[26,24],[24,18],[19,23],[23,25],[25,21],[21,19],[6,27],[7,30],[8,33],[27,47],[30,46],[33,45],[47,17],[46,14],[45,11],[11,8],[14,7],[17,6]],
    [[20,18],[26,20],[24,26],[18,24],[23,19],[25,23],[21,25],[19,21],[27,6],[30,7],[33,8],[47,27],[46,30],[45,33],[17,47],[14,46],[11,45],[8,11],[7,14],[6,17]],
    [[18,26],[26,18],[20,24],[24,20],[19,25],[25,19],[21,23],[23,21],[6,47],[47,6],[7,46],[46,7],[8,45],[45,8],[11,33],[33,11],[14,30],[30,14],[17,27],[27,17]],
    [[45,47],[47,53],[53,51],[51,45],[46,50],[50,52],[52,48],[48,46],[24,33],[25,34],[26,35],[33,42],[34,43],[35,44],[42,15],[43,16],[44,17],[15,24],[16,25],[17,26]],
    [[47,45],[53,47],[51,53],[45,51],[50,46],[52,50],[48,52],[46,48],[33,24],[34,25],[35,26],[42,33],[43,34],[44,35],[15,42],[16,43],[17,44],[24,15],[25,16],[26,17]],
    [[45,53],[53,45],[47,51],[51,47],[46,52],[52,46],[48,50],[50,48],[24,42],[42,24],[25,43],[43,25],[26,44],[44,26],[33,15],[15,33],[34,16],[16,34],[35,17],[17,35]],
    [[36,38],[38,44],[44,42],[42,36],[37,41],[41,43],[43,39],[39,37],[0,15],[1,12],[2,9],[9,51],[12,52],[15,53],[51,35],[52,32],[53,29],[29,0],[32,1],[35,2]],
    [[38,36],[44,38],[42,44],[36,42],[41,37],[43,41],[39,43],[37,39],[15,0],[12,1],[9,2],[51,9],[52,12],[53,15],[35,51],[32,52],[29,53],[0,29],[1,32],[2,35]],
    [[36,44],[44,36],[38,42],[42,38],[37,43],[43,37],[39,41],[41,39],[0,53],[53,0],[1,52],[52,1],[2,51],[51,2],[9,35],[35,9],[12,32],[32,12],[15,29],[29,15]],
    [[9,11],[11,17],[17,15],[15,9],[10,14],[14,16],[16,12],[12,10],[0,18],[3,21],[6,24],[18,45],[21,48],[24,51],[45,44],[48,41],[51,38],[38,6],[41,3],[44,0]],
    [[11,9],[17,11],[15,17],[9,15],[14,10],[16,14],[12,16],[10,12],[18,0],[21,3],[24,6],[45,18],[48,21],[51,24],[44,45],[41,48],[38,51],[6,38],[3,41],[0,44]],
    [[0,45],[45,0],[3,48],[48,3],[6,51],[51,6],[18,44],[44,18],[21,41],[41,21],[24,38],[38,24],[9,17],[17,9],[11,15],[15,11],[10,16],[16,10],[12,14],[14,12]]];
//moveList stores the sequence of swaps that are needed to be performed on an array to simulate a move on a Rubik's cube
const moveLetters = ['U',"U'","U2","R","R'","R2","F","F'","F2","D","D'","D2","B","B'","B2","L","L'","L2"];
const moveNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];//using moveNumber to index moveLetters gives notation for move with given number
const solvedState = [0,1,2,3,4,5,6,1,8,9,10,11,12,13,14,15,16,17,18,37,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];
const solvedStateDisplay = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];
class cube{
    constructor(state){
        this.state = state;
        this.applied = [];
    }
    move(type){ // this method applies a move to a Rubik's cube 
        this.applied.push(type); // records move which is being performed
        let temp = [...this.state]; 
        for (let i of moveList[type]){ // loops though each swap that needs to be made
            this.state[i[1]] = temp[i[0]];
        }

    }
    unmove(){//this method reverses the most recent move which has been applied
        let move = moveList[this.applied.pop()];
        let temp = [...this.state];
        for (let i of move){
            this.state[i[0]] = temp[i[1]];
        }

    }

}
function depthFirstSearch(cubeState, depthRemaining, allowedMoves, prune, pruneDepth){//recursive function which finds solutions of a given length
    if (depthRemaining<= pruneDepth){//check if remaining depth within the range that the prune table can be used
        if (prune[depthRemaining].has(String(cubeState.state))){//check if state is withing prune table
            if (depthRemaining == 0){ 
                return [structuredClone(cubeState.applied),true];
            }
        }
        else{
            return [cubeState.applied, false];// if state is not in prune table search from this postion is ended and false value is returned
        }

    }
    for (let i of allowedMoves){ // applies move and calls search function again repeats for all allowed moves
        cubeState.move(i);
        var result = depthFirstSearch(cubeState,depthRemaining-1,allowedMoves,prune,pruneDepth);
        cubeState.unmove();
        
        if (result[1]==true){
            return result; // ends search if solution is found
        }
    }
    return result;
}
function iterativeDeepening(cubeState, depthLimit,allowedMoves,prune,pruneDepth){
    for (let i=0;i<=depthLimit;i++){ //increase depth each iteration
        var output = depthFirstSearch(cubeState,i,allowedMoves,prune,pruneDepth) // call search at current depth
        if (output[1] == true){
            return output // return result if solution is not found 
        }
    }
    return false // return false to indicate no solution has been found
}
function generatePruneTable(solvedState,allowedMoves,pruneDepth,mode=0){
    const table = [];//create empty table
    if (mode ==0){       
        const finalState =new Set();
        finalState.add(String(solvedState));
        table.push(finalState); //add solved state into the table
    }
    else{
        table.push(solvedState);
        
    }
    for (let i=0;i<pruneDepth;i++){ 
        var newStates =new Set(); // new empty set to hold states found at this depth
        for (let j of table[i]){ //iterates though each state from the previous depth
            var state = j.split(",");
            for (let n of allowedMoves){ //applies all possible moves to a state 
                var temp = [...state]; 
                for (let k of moveList[n]){ 
                    temp[k[1]] = state[k[0]];
                }
                newStates.add(String(temp)); // adds each new state to set
            }
        }
        table.push(newStates); //adds set to prune table

    }
    return table//returns the final table

}
function maskState(state,mask){//applys mask to current state 
    let output = Array(54);
    for (let i=0;i<54;i++){ // loops through each index in the state array 
        output[i]=mask[state[i]]; //adds each value to the output array
    }
    return output;
}
const eoMask = [0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0];
const htrMask = [4,1,6,1,1,1,7,1,5,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,8,1,9,1,1,1,10,1,11];
const drMask = [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,1,1,1,1,1,1,1,1,1];
function solveCube(state,drprune,drpruneDepth,finishPrune,finishPruneDepth){
    let edgeOrientation = iterativeDeepening(new cube(maskState(state,eoMask)),20,moveNumbers,eoPrune,eoPruneDepth);//find moves to solve domino reduction
    const cubeState = new cube(state);
    for (let i of edgeOrientation[0]){ // apply moves to reach state where edge orientation is complete 
        cubeState.move(i);
    }
    let dominoReduction = iterativeDeepening(new cube(maskState(state,drMask)),20,[0,1,2,3,4,5,8,9,10,11,14,15,16,17],drprune,drpruneDepth);//find moves to solve domino reduction
    for (let i of dominoReduction[0]){ // apply moves to reach state where domino reduction is complete 
        cubeState.move(i);
    }
    let halfTurnReduction= iterativeDeepening(new cube(maskState(state,htrMask)),20,[0,1,2,3,4,5,8,9,10,11,14,15,16,17],htrPrune,htrPruneDepth);//find moves to solve domino reduction
    for (let i of halfTurnReduction[0]){ // apply moves to reach state where half turn reduction is complete 
        cubeState.move(i);
    }
    let finish = iterativeDeepening(new cube(cubeState.state),20,[2,5,8,11,14,17],finishPrune,finishPruneDepth);// find moves to solve cube from domino reduction state
    return edgeOrientation[0].concat(dominoReduction[0],halfTurnReduction[0],finish[0]);//combine four sections of solution and return them 
}
const finishPruneDepth = 7;
const finishPrune = generatePruneTable(solvedState,[2,5,8,11,14,17],finishPruneDepth);//create prune table for second stage of solving algorithm
const drpruneDepth = 6;
const drprune = generatePruneTable(drMask,[0,1,2,3,4,5,8,9,10,11,14,15,16,17],drpruneDepth);// create prune table for first stage of solving algorithm
const eoPruneDepth = 6;
const eoPrune = generatePruneTable(eoMask,moveNumbers,eoPruneDepth);
const htrStart = generatePruneTable(htrMask,[2,5,8,11,14,17],4);//find all starting positions

const htrStartPositions = htrStart[4];// this line and following loop combines htrStart[3] and htrStart[4] which gives all start positions
for (let i of htrStart[3]){
    htrStartPositions.add(i);
}
const htrPruneDepth = 6;
const htrPrune = generatePruneTable(htrStartPositions,[0,1,2,5,8,9,10,11,14,17],htrPruneDepth,1)
function reverseMoves(moves){//returns the sequence of moves which would undo the moves passed to the function
    let reversed = [];
    const size = moves.length;
    for (let i=0;i<size;i++){
        let move = moves.pop();
        if (move%3==0){
            reversed.push(move+1);
        }
        else if (move%3 == 1){
            reversed.push(move-1);
        }
        else{
            reversed.push(move);
        }
    
    }
    return reversed;
}
var scrambleMode = "full";//set initial scramble mode to full
function generateRandomState(){
    //intialize variables
    var edgePieces = [];//edge pieces to be placed
    var edgeLocations = [];//location of edge pieces
    var cornerPieces = [];//corner pieces to be placed
    var cornerLocations = [];//locations of corner pieces
    var cornerNumber = 0;//number of corner pieces to place
    var emptyCube = [];//empty cube state with solved pieces included if necessary 
    var edgeNumber =0;//number of edge pieces to place
    if (scrambleMode == "full"){//set variables if scramble mode is full
        edgePieces = [[1,37],[5,28],[1,37],[3,10],[21,14],[23,30],[39,32],[41,12],[46,25],[50,34],[52,43],[48,16]];
        edgeLocations = [[1,37],[5,28],[7,19],[3,10],[21,14],[23,30],[39,32],[41,12],[46,25],[50,34],[52,43],[48,16]];
        cornerPieces = [[0,9,38],[2,36,29],[8,27,20],[6,18,11],[47,26,33],[53,35,42],[51,44,15],[45,17,24]];
        cornerLocations = [[0,9,38],[2,36,29],[8,27,20],[6,18,11],[47,26,33],[53,35,42],[51,44,15],[45,17,24]];
        emptyCube = [0,0,0,0,4,0,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,22,0,0,0,0,0,0,0,0,31,0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,49,0,0,0,0];
        edgeNumber = 12;
        cornerNumber = 8;
    }
    else if (scrambleMode == "solvedFB"){//set varaibles if scramble mode is solvedFb
        edgePieces = [[1,37],[5,28],[1,37],[3,10],[23,30],[39,32],[46,25],[50,34],[52,43]];
        edgeLocations = [[1,37],[5,28],[7,19],[3,10],[23,30],[39,32],[46,25],[50,34],[52,43]];
        cornerPieces = [[0,9,38],[2,36,29],[8,27,20],[6,18,11],[47,26,33],[53,35,42]];
        cornerLocations = [[0,9,38],[2,36,29],[8,27,20],[6,18,11],[47,26,33],[53,35,42]];
        emptyCube = [0,0,0,0,4,0,0,0,0,0,0,0,12,13,14,15,16,17,0,0,0,21,22,0,24,0,0,0,0,0,0,31,0,0,0,0,0,0,0,0,40,41,0,0,44,45,0,0,48,49,0,51,0,0];
        edgeNumber = 9;
        cornerNumber = 6;
    }
    else if (scrambleMode == "solvedCross"){//set variables if scramble mode is solved cross
        edgePieces = [[1,37],[5,28],[1,37],[3,10],[21,14],[23,30],[39,32],[41,12]];
        edgeLocations = [[1,37],[5,28],[7,19],[3,10],[21,14],[23,30],[39,32],[41,12]];
        cornerPieces = [[0,9,38],[2,36,29],[8,27,20],[6,18,11],[47,26,33],[53,35,42],[51,44,15],[45,17,24]];
        cornerLocations = [[0,9,38],[2,36,29],[8,27,20],[6,18,11],[47,26,33],[53,35,42],[51,44,15],[45,17,24]];
        emptyCube = [0,0,0,0,4,0,0,0,0,0,0,0,0,13,0,0,16,0,0,0,0,0,22,0,0,25,0,0,0,0,0,31,0,0,34,0,0,0,0,0,40,0,0,43,0,0,46,0,48,49,50,0,52,0];
        edgeNumber = 8;
        cornerNumber = 8;
    }
    else if (scrambleMode == "L10p"){//set vairables if scramble mode is L10p
        edgePieces = [[1,37],[5,28],[1,37],[3,10],[46,25],[52,43]];
        edgeLocations = [[1,37],[5,28],[7,19],[3,10],[46,25],[52,43]];
        cornerPieces = [[0,9,38],[2,36,29],[8,27,20],[6,18,11]];
        cornerLocations = [[0,9,38],[2,36,29],[8,27,20],[6,18,11]];
        emptyCube = [0,0,0,0,4,0,0,0,0,0,0,0,12,13,14,15,16,17,0,0,0,21,22,23,24,0,26,0,0,0,30,31,32,33,34,35,0,0,0,39,40,41,42,0,44,45,0,47,48,49,50,51,0,53];
        edgeNumber = 6;
        cornerNumber = 4;
    }
    let edgeOrientationTotal = 0
    var orientation = 0
    for (let i =0;i<edgeNumber;i++){//place each edge piece
        let location = Math.floor(Math.random()*(edgeNumber-i));//choose location to place edge
        if (i<edgeNumber-1){
            orientation = Math.floor(Math.random()*2);//choose the orientation of the edge
            edgeOrientationTotal = edgeOrientationTotal+orientation
            }
        else{
            orientation = edgeOrientationTotal%2
        }
        
        if (orientation ==0){
            emptyCube[edgeLocations[location][0]] = edgePieces[i][0];
            emptyCube[edgeLocations[location][1]] = edgePieces[i][1];
        }
        else{
            emptyCube[edgeLocations[location][0]] = edgePieces[i][1];
            emptyCube[edgeLocations[location][1]] = edgePieces[i][0];
        }
        edgeLocations.splice(location,1);//remove location so no other edge can be placed in the same position
    }
    let cornerOrientationTotal = 0
    var orientation = 0
    for (let i =0;i<cornerNumber;i++){ //place all corner pieces
        let location = Math.floor(Math.random()*(cornerNumber-i));// choose random location
        if (i<cornerNumber-1){
            orientation = Math.floor(Math.random()*3); //choose random orientation
            cornerOrientationTotal = cornerOrientationTotal+orientation
        }
        else{
            orientation = 3 - cornerOrientationTotal%3
            if (orientation==3){
                orientation = 0
            }

        }
        if (orientation ==0){
            emptyCube[cornerLocations[location][0]] = cornerPieces[i][0];
            emptyCube[cornerLocations[location][1]] = cornerPieces[i][1];
            emptyCube[cornerLocations[location][2]] = cornerPieces[i][2];
        }
        else if (orientation ==1){
            emptyCube[cornerLocations[location][0]] = cornerPieces[i][2];
            emptyCube[cornerLocations[location][1]] = cornerPieces[i][0];
            emptyCube[cornerLocations[location][2]] = cornerPieces[i][1];
        }
        else{
            emptyCube[cornerLocations[location][0]] = cornerPieces[i][1];
            emptyCube[cornerLocations[location][1]] = cornerPieces[i][2];
            emptyCube[cornerLocations[location][2]] = cornerPieces[i][0];
        }
        cornerLocations.splice(location,1);//remove location so it cannot be used again
        
    }
    return emptyCube;
}
function removeRedundantMoves(moves){
    let previous = 99; //initially set to value that will not match any actual move to prevent errors
    let convert = [[2,9,1],[9,2,0],[1,0,9]]; //referenced with coordinates of move1%3 and move2%3 and contains how they combine mod3
    for (let i=0;i<moves.length;i++){
        if (Math.floor(moves[i]/3)==previous){ // check if same side is moved as previous move
            let combined = convert[moves[i]%3][moves[i-1]%3];
            if (combined ==9){ // 9 means that the second move reverses the first
                moves.splice(i-1,2);
                i = i-2;
            }
            else{
                moves[i-1] = combined+ moves[i] -moves[i]%3;
                moves.splice(i,1);
                i = i-1;    
            }
        }
        previous = Math.floor(moves[i]/3);      
    }
    return moves
}

document.getElementById("scrambleButton").addEventListener("click", newScramble);//listen for button click
var scrambleNotation = ""
function newScramble(){
    const newScrambleState = new cube(structuredClone(solvedState));
    newScrambleState.state = generateRandomState(); //get random state
    let solution = solveCube(newScrambleState.state,drprune,drpruneDepth,finishPrune, finishPruneDepth);//call solver
    let scramble = removeRedundantMoves(reverseMoves(solution)); //reverse solution for scramble
    displayFromMoves(scramble); //display state
    scrambleNotation = ""
    for (let i of scramble){
        scrambleNotation= scrambleNotation+moveLetters[i]+" ";//output result
    }
    document.getElementById("scramble").textContent = scrambleNotation;
}
function convertTime(result){
    let out = "";
    if (result[2]){//check if result is DNF
        return "DNF";
    }
    else{ 
        let time = result[0];
        decimal= String(time).slice(-3);//get decimal part of time
        if (time>=60000){// check if minutes need to be displayed
            out = out + String(Math.floor(time/60000))+":";//add number of minutes to output
            time = time%60000;//remove minutes that have been added from the time
        }
        out = out + String(Math.floor(time/1000))+".";//add number of seconds 
        out = out +decimal;// add decimal part
        return out;
    }
}
class cubeTimer{
    constructor(){
        this.timeList = [];
        this.start = 0;
    }
    startTimer(){
        this.start = Date.now()// record start time
    }
    stopTimer(){
        this.timeList.push([Date.now()-this.start,false,false,String(scrambleNotation)])//calcualte and record solve time

    }
    plusTwo(){
        if (this.timeList[this.timeList.length-1][1] == false){//if penalty is not on result add penalty
            this.timeList[this.timeList.length-1][1] =true;
            this.timeList[this.timeList.length-1][0] =this.timeList[this.timeList.length-1][0]+2000;
        }
        else{ // if penalty is on result remove it
            this.timeList[this.timeList.length-1][1] =false;
            this.timeList[this.timeList.length-1][0] =this.timeList[this.timeList.length-1][0]-2000;
        }
    }
    dnf(){
        if (this.timeList[this.timeList.length-1][2]== false){//set dnf to true if not already
            this.timeList[this.timeList.length-1][2]= true;
        }
        else{//set dnf to false if it is true
            this.timeList[this.timeList.length-1][2]= false;
        }
    }
    delete(){
        this.timeList.pop()//delete most recent time
    }
}
newScramble();// generate a scramble when page loads
var inspectionTime = -1;
var displayTime = -1;
var inspection = false;
var timing = false;
var inspectionPlusTwo = false;
var inspectionDnf = false;
const timer = new cubeTimer()
document.body.addEventListener('click',clickEvent);//listen for any click on page
function checkEvent(event){//check if event is click outside of buttons and table
    if (inputMode != "timer"){
        return false
    }
    if (event.target.closest("div")!=null){
        if (event.target.closest("div").id == "resultsTable"){
            return false
        }
    }
    if ((["scrambleButton", "+2","DNF","Delete","reset","inputMode","scrambleType","solvedCross","full","solvedFB","L10p"].includes(event.target.id))){
        return false
    }
    
        
    return true
    
}
function clickEvent(event){
    if (checkEvent(event)){ //ignore click if it is on a button 
        if (inspection == false && timing == false){//start inspection if neither timer or inspection are running
            inspection = true;
            inspectionTimer();
        }
        else if (timing == false){ // end inspection and star timer if inspection is running
            timer.startTimer();
            document.body.style.backgroundColor = "white";
            inspection=false;
            inspectionTime = -1;
            timing = true;
            displayTimer();
        }
        else{//stop timer when timer is running and make a new scramble
            timer.stopTimer();
            if (inspectionPlusTwo){//add inspection +2 if requierd
                timer.timeList[timer.timeList.length-1][0]=timer.timeList[timer.timeList.length-1][0]+2000;
                inspectionPlusTwo = false;
            }
            if (inspectionDnf){//check for inspection dnf and apply penalty if needed
                inspectionDnf =false;
                timer.dnf();
            }
            document.getElementById("timer").textContent = convertTime(timer.timeList[timer.timeList.length-1]);
            timing = false;
            displayTime = -1;
            addToTable();
            newScramble();      
        }
    }
}

function inspectionTimer(){
    if (inspectionTime <17 && inspection){//check if inspection is still ongoing
        inspectionTime++;//increment timer
        document.getElementById("timer").textContent = String(inspectionTime)+" inspecting";
        if (inspectionTime == 8){//change background colour to give user an 8 second warining
            document.body.style.backgroundColor= "green";
        }
        else if (inspectionTime ==12){ // change background colour to give user a 12 second warining
            document.body.style.backgroundColor = "red";
        }
        else if (inspectionTime==15){
            inspectionPlusTwo = true;
        }
        
        setTimeout(inspectionTimer,1000); 
        
    }
    else{
        if (inspectionTime == 17){
            inspectionDnf = true;
            inspectionPlusTwo=false;
        }
        document.body.style.backgroundColor = "white";//reset background colour once inspection is finished
    }
}
function displayTimer(){
    if (timing){
        displayTime++; //increment timer
        document.getElementById("timer").textContent = String(displayTime) +" solving"; // update text
        setTimeout(displayTimer,1000);//call function again in one second
    }
}
document.getElementById("+2").addEventListener("click",applyPlusTwo);
function applyPlusTwo(){
    timer.plusTwo();
    document.getElementById("timer").textContent = convertTime(timer.timeList[timer.timeList.length-1]);
    updateTable();
}
document.getElementById("DNF").addEventListener("click",applyDnf);//listen for dnf button press
function applyDnf(){ // add dnf penalty
    timer.dnf();
    document.getElementById("timer").textContent = convertTime(timer.timeList[timer.timeList.length-1]);
    updateTable();
}
function updateTable(){
    var table = document.getElementById("results");//get table
    var row = table.getElementsByTagName("tr")[1];//get top row
    var cell = row.getElementsByTagName("td")[0];//get cell
    cell.textContent = convertTime(timer.timeList[timer.timeList.length-1]);//update time
    var cell1 = row.getElementsByTagName("td")[1];
    var cell2 = row.getElementsByTagName("td")[2];
    var cell3 = row.getElementsByTagName("td")[3];
    var cell4 = row.getElementsByTagName("td")[4];
    var cell5 = row.getElementsByTagName("td")[5];
    cell1.textContent = calculateAverage(timer.timeList.slice(-5),1,5);
    cell2.textContent = calculateAverage(timer.timeList.slice(-12),1,12);
    cell3.textContent = calculateAverage(timer.timeList.slice(-25),2,25);
    cell4.textContent = calculateAverage(timer.timeList.slice(-50),3,50);
    cell5.textContent = calculateAverage(timer.timeList.slice(-100),5,100);
}
function calculateAverage(times,remove,size){
    if (times.length >=size){//check that there are enough results for average size
        var numbers = []
        let dnfCount = 0;
        for (let i of times){
            if (i[2]){//if result is dnf add very large number so it will be removed for being the largest number
                numbers.push(99999999999);
                dnfCount++;
            }
            else{
                numbers.push(i[0]);
            }
        }
        if (dnfCount > remove){//check that there are not too many dnf results for an average
            return "DNF";
        }
        numbers.sort(function(a,b){return a-b});//sort array of numbers
        let total = 0;
        for (let i=remove;i<(size-remove);i++){
            total = total +numbers[i];
        }
        return convertTime([Math.round(total/(size-(2*remove))),false,false]);
    }
    else{
        return "-";
    }
}
document.getElementById("Delete").addEventListener("click",deleteSolve);//listen for delete button press
function deleteSolve(){ // delete most recent solve
    if (confirm("Are you sure you want to delete this solve")){ //check that the user actually intended to press the button
        timer.delete();//remove from list of times
        var table = document.getElementById("results");
        table.deleteRow(1);// delete the result from the table
    }
}
document.getElementById("results").addEventListener('click',viewScramble);//listen for clicks on table
function viewScramble(event){
    alert(event.target.closest("tr").id); // find which row is clicked and give alert containg the id which is the scramble
}
window.addEventListener('beforeunload', saveData);// call function to save data when page is closed
function saveData(){
    localStorage.setItem("storedResults",JSON.stringify(timer.timeList));// save data
}
let included = [];
for (let i of JSON.parse(localStorage.getItem("storedResults"))){//load saved results and run loop adding each result to table
    included.push(i); //has previously added results so that average can be calculated for each row
    var table = document.getElementById("results");//add new result to table
    var row = table.insertRow(1);
    row.id = i[3];//save scramble as row id
    var cell = row.insertCell(0);
    cell.textContent = convertTime(included[included.length-1]);
    var cell1 = row.insertCell(1);//get cells for average
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    cell1.textContent = calculateAverage(included.slice(-5),1,5);//caculate each average and write in cell
    cell2.textContent = calculateAverage(included.slice(-12),1,12);
    cell3.textContent = calculateAverage(included.slice(-25),2,25);
    cell4.textContent = calculateAverage(included.slice(-50),3,50);
    cell5.textContent = calculateAverage(included.slice(-100),5,100);
}
timer.timeList = included;//add the loaded data to list of times in timer object
document.getElementById("reset").addEventListener("click",resetTimes); //listens for reset button press
function resetTimes(){
    if (confirm("Are you sure you want to delete all saved times")){//check that the user intended to reset all times
        timer.timeList = []; //empty list of times
        location.reload();//refresh webpage so changes can take effect
    }
}
document.getElementById("timeInputBox").hidden = true; //initially hid the text input box
var inputMode = "timer";//set input mode to be timer when the page is first loaded
document.getElementById("inputMode").addEventListener("click",changeMode);
function changeMode(){
    if (inputMode == "timer"){//change input mode to typing
        document.getElementById("timer").hidden = true; //hide timer
        document.getElementById("timeInputBox").hidden = false;//show text input box
        inputMode = "typing"
        document.getElementById("inputMode").textContent = "timer input"
    }
    else{ //change input mode to timer
        document.getElementById("timeInputBox").hidden = true;//hide text input
        document.getElementById("timer").hidden = false;//show timer
        inputMode = "timer";
        document.getElementById("inputMode").textContent= "typing input";
        
    }
}
function addToTable(){
    var table = document.getElementById("results");//add new result to table
    var row = table.insertRow(1);
    row.id = scrambleNotation;//save scramble as row id
    var cell = row.insertCell(0);
    cell.textContent = convertTime(timer.timeList[timer.timeList.length-1]);
    var cell1 = row.insertCell(1);//get cells for average
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    cell1.textContent = calculateAverage(timer.timeList.slice(-5),1,5);//caculate each average and write in cell
    cell2.textContent = calculateAverage(timer.timeList.slice(-12),1,12);
    cell3.textContent = calculateAverage(timer.timeList.slice(-25),2,25);
    cell4.textContent = calculateAverage(timer.timeList.slice(-50),3,50);
    cell5.textContent = calculateAverage(timer.timeList.slice(-100),5,100);
    
}

const textInputBox = document.getElementById("timeInputBox");
textInputBox.addEventListener("keyup",inputTime);
function inputTime(event){
    if (event.key == "Enter"){
        let dataIn = textInputBox.value;
        dataIn = dataIn.replace(":","");
        dataIn = dataIn.replace(".","");
        dataIn = Number(dataIn); // convert to number
        if (dataIn != NaN){ // check if input is number
            // the last two digits will be fractions of a second. The 2 digits before these will be seconds
            // any digits before will be miuntes since this is what will be displayed on a timer
            // I want to conver this milliseconds since this is what is used throughout the program
            let hundredths = dataIn%100;
            let seconds = (dataIn%10000 -hundredths) /100;
            let minutes = (dataIn - 100*seconds - hundredths)/10000;
            let milliseconds = 10*hundredths + 1000*seconds + 60000*minutes;
            console.log(hundredths,seconds,minutes)
            timer.timeList.push([milliseconds,false,false,String(scrambleNotation)]);//record time
            addToTable();//add ressult to table
            textInputBox.value = "";//empty input box
        
        }


    }
}
document.getElementById("scrambleType").addEventListener("click",displayMenu);
function displayMenu(){
    const menu = document.getElementById("srambleTypeList")//get list
    if (menu.hidden == true){ //show menu if it is hidden
        menu.hidden = false;
    }
    else{ //hide menu if it is displayed
        menu.hidden = true;
   }
}

//changes scramble mode, generates new scramble and hides menu when new scramble mode is selected
document.getElementById("full").addEventListener("click",function(event){scrambleMode="full";displayMenu();newScramble()});
document.getElementById("solvedFB").addEventListener("click",function(){scrambleMode="solvedFB";displayMenu();newScramble()});
document.getElementById("L10p").addEventListener("click",function(){scrambleMode="L10p";displayMenu();newScramble()});
document.getElementById("solvedCross").addEventListener("click",function(){scrambleMode="solvedCross";displayMenu();newScramble()});
