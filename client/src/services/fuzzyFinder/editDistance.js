function editDistance(str1, str2) {

    var editMatrix = []

    for (var i = 0; i <= str1.length; ++i){
        editMatrix[i] = [i]
    }

    for (var i = 0; i <= str2.length; ++i){
        editMatrix[0][i] = i
    }

    for (var j = 1; j <= str2.length; ++j){
        for (var i = 1; i <= str1.length; ++i){

            if(str1[i - 1] === str2[j - 1]){
                editMatrix[i][j] = editMatrix[i-1][j-1];
            }else{
                editMatrix[i][j] = Math.min(
                    editMatrix[i-1][j] + 1,
                    editMatrix[i][j-1] + 1,
                    editMatrix[i-1][j-1] + 1
                );
            }
        }
    }

    return editMatrix[str1.length][str2.length]
}

// console.log(editDistance('asdf', 'asfg'))
// module.exports = editDistance;