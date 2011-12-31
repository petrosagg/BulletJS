/*
Copyright (c) 2003-2009 Erwin Coumans  http://bullet.googlecode.com

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the use of this software.
Permission is granted to anyone to use this software for any purpose, 
including commercial applications, and to alter it and redistribute it freely, 
subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
*/

/** @define {number} */ var BT_BULLET_VERSION = 279;
/** @define {number} */ var BT_LARGE_FLOAT    = 1e18;
/** @define {number} */ var SIMD_2_PI         = 6.283185307179586232;
/** @define {number} */ var SIMD_PI           = SIMD_2_PI * 0.5;
/** @define {number} */ var SIMD_HALF_PI      = SIMD_2_PI * 0.25;
/** @define {number} */ var SIMD_RADS_PER_DEG = SIMD_2_PI / 360;
/** @define {number} */ var SIMD_DEGS_PER_RAD = 360 / SIMD_2_PI;
/** @define {number} */ var SIMDSQRT12 = 0.7071067811865475244008443621048490;
/** @define {number} */ var SIMD_EPSILON = 1.19209289550781250000e-7;
/** @define {number} */ var SIMD_INFINITY = 340282346638528859811704183484516925440;

/**
 * @return {number}
 * @export
 */
function btGetVersion() {
    return BT_BULLET_VERSION;
}

///The btScalar type abstracts floating point numbers, to easily switch between double and single floating point precision.
/** @typedef {number} */
var btScalar;

/**
 * @param {number} x
 * @return {number}
 * @export
 */
btScalar = function btScalar( x ) {
    return x;
}

/**
 * @param {btScalar} y
 * @return {btScalar}
 * @export
 */
function btSqrt( y ) {
    return Math.sqrt( y );
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btFabs( x ) { 
    return Math.abs( x ); 
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btCos( x ) { 
    return Math.cos( x ); 
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btSin( x ) { 
    return Math.sin( x );
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btTan( x ) { 
    return Math.tan( x ); 
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btAcos( x ) {
    if ( x < btScalar( -1 ) ) {
        x = btScalar( -1 );
    }
    if ( x > btScalar( 1 ) ) {
        x = btScalar( 1 );
    }
    return Math.acos( x );
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btAsin( x ) {
    if ( x < btScalar( -1 ) ) {
        x = btScalar( -1 );
    }
    if ( x > btScalar( 1 ) ) { 
        x = btScalar( 1 );
    }
    return Math.asin( x );
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btAtan( x ) { 
    return Math.atan( x );
}

/**
 * @param {btScalar} x
 * @param {btScalar} y
 * @return {btScalar}
 * @export
 */
function btAtan2( x, y ) { 
    return Math.atan2( x, y );
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btExp( x ) { 
    return Math.exp( x ); 
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btLog( x ) { 
    return Math.log( x ); 
}

/**
 * @param {btScalar} x
 * @param {btScalar} y
 * @return {btScalar}
 * @export
 */
function btPow( x, y ) { 
    return Math.pow( x, y ); 
}

/**
 * @param {btScalar} x
 * @param {btScalar} y
 * @return {btScalar}
 * @export
 */
function btFmod( x, y ) { 
    return x % y;
}

/**
 * @param {btScalar} y
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btAtan2Fast( y, x ) {
    var coeff_1 = SIMD_PI / 4.0;
    var coeff_2 = 3.0 * coeff_1;
    var abs_y = btFabs( y );
    var angle, r;
    if ( x >= 0.0 ) {
        r = ( x - abs_y ) / ( x + abs_y );
        angle = coeff_1 - coeff_1 * r;
    } 
    else {
        r = ( x + abs_y ) / ( abs_y - x );
        angle = coeff_2 - coeff_1 * r;
    }
    return ( y < 0.0 ) ? -angle : angle;
}

/**
 * @param {btScalar} x
 * @return {boolean}
 * @export
 */
function btFuzzyZero( x ) { 
    return btFabs( x ) < SIMD_EPSILON; 
}

/**
 * @param {btScalar} a
 * @param {btScalar} eps
 * @return {boolean}
 * @export
 */
function btEqual( a, eps ) {
    return ( a <= eps ) && ( a >= -eps );
}

/**
 * @param {btScalar} a
 * @param {btScalar} eps
 * @return {boolean}
 * @export
 */
function btGreaterEqual( a, eps ) {
    return a > eps;
}

/**
 * @param {btScalar} x
 * @return {number}
 * @export
 */
function btIsNegative( x ) {
    return x < 0 ? 1 : 0;
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btRadians( x ) { 
    return x * SIMD_RADS_PER_DEG;
}

/**
 * @param {btScalar} x
 * @return {btScalar}
 * @export
 */
function btDegrees( x ) { 
    return x * SIMD_DEGS_PER_RAD; 
}

/**
 * @param {btScalar} a
 * @param {btScalar} b
 * @param {btScalar} c
 * @return {btScalar}
 * @export
 */
function btFsel( a, b, c ) {
    return a >= 0 ? b : c;
}

/**
 * @return {boolean}
 * @export
 */
function btMachineIsLittleEndian() {
    var i = new Int32Array( [ 1 ] );
    var p = new Int8Array( i.buffer );
    if ( p[ 0 ] == 1 ) { // Lowest address contains the least significant byte
        return true;
    }
    else {
        return false;
    }
}

/**
 * @deprecated
 * @export
 */
function btSelect() {
}

/**
 * btSelect avoids branches, which makes performance much better for consoles like Playstation 3 and XBox 360
 * Thanks Phil Knight. See also http://www.cellperformance.com/articles/2006/04/more_techniques_for_eliminatin_1.html
 * @param {number} condition
 * @param {number} valueIfConditionNonZero
 * @param {number} valueIfConditionZero
 * @return {number}
 * @export
 */
function btSelect_a( condition, valueIfConditionNonZero, valueIfConditionZero ) {
    // Set testNz to 0xFFFFFFFF if condition is nonzero, 0x00000000 if condition is zero
    // Rely on positive value or'ed with its negative having sign bit on
    // and zero value or'ed with its negative (which is still zero) having sign bit off 
    // Use arithmetic shift right, shifting the sign bit through all 32 bits

    var testNz = ( condition | -condition ) >> 31;
    var testEqz = ~testNz;
    return ( ( valueIfConditionNonZero & testNz) | ( valueIfConditionZero & testEqz ) );
}


/**
 * @param {number} condition
 * @param {number} valueIfConditionNonZero
 * @param {number} valueIfConditionZero
 * @return {number}
 * @export
 */
function btSelect_b( condition, valueIfConditionNonZero, valueIfConditionZero ) {
    return ( condition !== 0 ) ? valueIfConditionNonZero : valueIfConditionZero;
}

/**
 * @deprecated
 * @export
 */
function btSwap() {
}

/*template<typename T>  function btSwap( T& a, T& b ) {
    T tmp = a;
    a = b;
    b = tmp;
}*/

/**
 * @deprecated
 * @export
 */
function btSwapEndian() {
}

//PCK: endian swapping functions
/**
 * @param {number} val
 * @return {number}
 * @export
 */
function btSwapEndian_a( val ) {
    return ( ( ( val & 0xff000000 ) >> 24 ) | ( ( val & 0x00ff0000 ) >> 8 ) | ( ( val & 0x0000ff00 ) << 8 ) | ( ( val & 0x000000ff ) << 24 ) );
}

/**
 * @param {number} val
 * @return {number}
 * @export
 */
function btSwapEndian_b( val ) {
    return ( ( ( val & 0xff00 ) >> 8 ) | ( ( val & 0x00ff ) << 8 ) );
}

/**
 * @param {number} val
 * @return {number}
 * @export
 */
function btSwapEndian_c( val ) {
    return btSwapEndian_a( val );
}

/**
 * @param {number} val
 * @return {number}
 * @export
 */
function btSwapEndian_d( val ) {
    return btSwapEndian_b( val );
}

///btSwapFloat uses using char pointers to swap the endianness
///btSwapFloat/btSwapDouble will NOT return a float, because the machine might 'correct' invalid floating point values
///Not all values of sign/exponent/mantissa are valid floating point numbers according to IEEE 754. 
///When a floating point unit is faced with an invalid value, it may actually change the value, or worse, throw an exception. 
///In most systems, running user mode code, you wouldn't get an exception, but instead the hardware/os/runtime will 'fix' the number for you. 
///so instead of returning a float/double, we return integer/long long integer

/**
 * @param {number} d
 * @return {number}
 * @export
 */
function btSwapEndianFloat( d ) {
    var src = new Float32Array( 1 );
    src[ 0 ] = d;

    var dst = new Int32Array( 1 );

    var srcBytes = new Uint8Array( src.buffer );
    var dstBytes = new Uint8Array( dst.buffer );

    dstBytes[ 0 ] = srcBytes[ 3 ];
    dstBytes[ 1 ] = srcBytes[ 2 ];
    dstBytes[ 2 ] = srcBytes[ 1 ];
    dstBytes[ 3 ] = srcBytes[ 0 ];
    return dst[ 0 ];
}

// unswap using char pointers
/**
 * @param {number} a
 * @return {number}
 * @export
 */
function btUnswapEndianFloat( a ) {
    var src = new Int32Array( 1 );
    src[ 0 ] = a;

    var dst = new Float32Array( 1 );

    var srcBytes = new Uint8Array( src.buffer );
    var dstBytes = new Uint8Array( dst.buffer );

    dstBytes[ 0 ] = srcBytes[ 3 ];
    dstBytes[ 1 ] = srcBytes[ 2 ];
    dstBytes[ 2 ] = srcBytes[ 1 ];
    dstBytes[ 3 ] = srcBytes[ 0 ];

    return dst[ 0 ];
}

// swap using char pointers
/**
 * @deprecated
 * @export
 */
function btSwapEndianDouble() {
    /*
    var src = new Float64Array( 1 );
    src[ 0 ] = d;
    var srcBytes = 
    unsigned char *src = (unsigned char *) &d;

    dst[ 0 ] = src[ 7 ];
    dst[ 1 ] = src[ 6 ];
    dst[ 2 ] = src[ 5 ];
    dst[ 3 ] = src[ 4 ];
    dst[ 4 ] = src[ 3 ];
    dst[ 5 ] = src[ 2 ];
    dst[ 6 ] = src[ 1 ];
    dst[ 7 ] = src[ 0 ];*/
}

// unswap using char pointers
/**
 * @deprecated
 * @export
 */
function btUnswapEndianDouble() {
    /*
    double d = 0.0;
    unsigned char *dst = (unsigned char *) &d;

    dst[ 0 ] = src[ 7 ];
    dst[ 1 ] = src[ 6 ];
    dst[ 2 ] = src[ 5 ];
    dst[ 3 ] = src[ 4 ];
    dst[ 4 ] = src[ 3 ];
    dst[ 5 ] = src[ 2 ];
    dst[ 6 ] = src[ 1 ];
    dst[ 7 ] = src[ 0 ];

    return d;*/
}

/**
 * Returns normalized value in range [-SIMD_PI, SIMD_PI]
 * @param {btScalar} angleInRadians
 * @return {btScalar}
 * @export
 */
function btNormalizeAngle( angleInRadians ) {
    angleInRadians = btFmod( angleInRadians, SIMD_2_PI );
    if( angleInRadians < -SIMD_PI ) {
        return angleInRadians + SIMD_2_PI;
    }
    else if ( angleInRadians > SIMD_PI ) {
        return angleInRadians - SIMD_2_PI;
    }
    else {
        return angleInRadians;
    }
}

/**
 * Rudimentary class to provide type info
 * @param {number} objectType
 * @constructor
 * @export
 */
function btTypedObject( objectType ) {
    this.m_objectType = objectType;
}

/** 
 * @export
 */
btTypedObject.prototype = {
    constructor: btTypedObject,
    /**
     * @return {number}
     */
    getObjectType: function() {
        return this.m_objectType;
    }
};

/**
 * Reciprocal square root 
 * @param {btScalar} x
 * @return {btScalar}
 */
function btRecipSqrt( x ) {
    return 1 / btSqrt( x );
}
