function glhPerspectivef2(fovyInDegrees,aspectRatio, znear, zfar)
{
    let matrix = [];
    let ymax, xmax;
    let temp, temp2, temp3, temp4;
    ymax = znear * Math.tan(fovyInDegrees * Math.PI / 360.0);
    // ymin = -ymax;
    // xmin = -ymax * aspectRatio;
    xmax = ymax * aspectRatio;
    glhFrustumf2(matrix, -xmax, xmax, -ymax, ymax, znear, zfar);
    return matrix
}
function glhFrustumf2(matrix, left, right, bottom, top, znear, zfar)
{
    let temp, temp2, temp3, temp4;
    temp = 2.0 * znear;
    temp2 = right - left;
    temp3 = top - bottom;
    temp4 = zfar - znear;
    matrix[0] = temp / temp2;
    matrix[1] = 0.0;
    matrix[2] = 0.0;
    matrix[3] = 0.0;
    matrix[4] = 0.0;
    matrix[5] = temp / temp3;
    matrix[6] = 0.0;
    matrix[7] = 0.0;
    matrix[8] = (right + left) / temp2;
    matrix[9] = (top + bottom) / temp3;
    matrix[10] = (-zfar - znear) / temp4;
    matrix[11] = -1.0;
    matrix[12] = 0.0;
    matrix[13] = 0.0;
    matrix[14] = (-temp * zfar) / temp4;
    matrix[15] = 0.0;
}
function MulMatVec(mat,vec){
    return [
        mat[0]*vec[0] + mat[1]*vec[1] + mat[2]*vec[2] + mat[3]*vec[3] ,
        mat[4]*vec[0] + mat[5]*vec[1] + mat[6]*vec[2] + mat[7]*vec[3] ,
        mat[8]*vec[0] + mat[9]*vec[1] + mat[10]*vec[2] + mat[11]*vec[3] ,
        mat[12]*vec[0] + mat[13]*vec[1] + mat[14]*vec[2] + mat[15]*vec[3] ,
        
    ]
}
const cameraMatrix = glhPerspectivef2(90, 1.5, 1, 100)
const points = [
    [5,5,5,1],
    [5,5,15,1],
    [5,0,0,1],
]

for(let p of points){
    console.log(MulMatVec(cameraMatrix, p))
}