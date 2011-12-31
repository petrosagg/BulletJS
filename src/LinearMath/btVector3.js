/**@brief btVector3 can be used to represent 3D points and vectors.
 * It has an un-used w component to suit 16-byte alignment when btVector3 is stored in containers. This extra component can be used by derived classes (Quaternion?) or by user
 * Ideally, this class should be replaced by a platform optimized SIMD version that keeps the data in registers
 * @param {btScalar=} x
 * @param {btScalar=} y
 * @param {btScalar=} z
 * @constructor
 */
function btVector3( x, y, z ){
    this.m_floats = new Float32Array( 4 );
    this.m_floats[ 0 ] = x;
    this.m_floats[ 1 ] = y;
    this.m_floats[ 2 ] = z;
    this.m_floats[ 3 ] = 0;
}

btVector3.prototype = {
    constructor: btVector3,
    /**
     * @brief Add a vector to this one 
     * @param {btVector3} v The vector to add to this one
     * @return {btVector3}
     */
    op_addeq: function( v ) {
        this.m_floats[0] += v.m_floats[0];
        this.m_floats[1] += v.m_floats[1];
        this.m_floats[2] += v.m_floats[2];
        return this;
    },
    /**
     * @brief Subtract a vector to this one 
     * @param {btVector3} v The vector to add to this one
     * @return {btVector3}
     */
    op_subeq: function( v ) {
        this.m_floats[0] -= v.m_floats[0];
        this.m_floats[1] -= v.m_floats[1];
        this.m_floats[2] -= v.m_floats[2];
        return this;
    },
    /**
     * @deprecated
     */
    op_mul: function() {
    },
    /**
     * @brief Scale the vector
     * @param {btScalar} s Scale factor
     * @return {btVector3}
     */
    op_muleq_a: function( s ) {
        this.m_floats[0] *= s;
        this.m_floats[1] *= s;
        this.m_floats[2] *= s;
        return this;
    },
    /**
     * @brief Inversely scale the vector 
     * @param {btScalar} s Scale factor
     * @return {btVector3}
     */
    op_diveq: function( s ) {
        this.op_muleq( 1 / s );
        return this;
    },
    /**
     * @brief Return the dot product
     * @param v The other vector in the dot product 
     * @return {btScalar}
     */
    dot: function( v ) {
        return  this.m_floats[0] * v.m_floats[0] + 
                this.m_floats[1] * v.m_floats[1] +
                this.m_floats[2] * v.m_floats[2];
        
    },
    /**
     * @brief Return the length of the vector squared 
     * @return {btScalar}
     */
    length2: function() {
        return this.dot( this );
    },
    /**
     * @brief Return the length of the vector
     * @return {btScalar}
     */
    length: function() {
        return btSqrt( this.length2() );
    },
    /**
     * @brief Return the distance squared between the ends of this and another vector
     * This is semantically treating the vector like a point 
     * @param {btVector3} v
     * @return {btScalar}
     */
    distance2: function( v ) {
        return btVector3.op_sub( v, this ).length2();
    },
    /**
     * @brief Return the distance between the ends of this and another vector
     * This is symantically treating the vector like a point 
     * @param {btVector3} v
     * @return {btScalar}
     */
    distance: function( v ) {
        return btVector3.op_sub( v, this ).length();
    },
    /**
     * @return {btVector3}
     */
    safeNormalize: function() {
        /** @type {btVector3} */ var absVec = this.absolute();
        /** @type {number} */ var maxIndex = absVec.maxAxis();
        if ( absVec.op_get( maxIndex ) > 0 ) {
            this.op_diveq( absVec.op_get( maxIndex ) );
            return this.op_diveq( this.length() );
        }
        this.setValue( 1, 0, 0 );
        return this;
    },
    /**
     * @brief Normalize this vector 
     * x^2 + y^2 + z^2 = 1 
     * @return {btVector3}
     */
    normalize: function() {
        return this.op_diveq( this.length() );
    },
    /**
     * @brief Return a normalized version of this vector 
     * @return {btVector3}
     */
    normalized: function(){
        return btVector3.op_div_a( this, this.length() );
    },
    /**
     * @brief Return a rotated version of this vector
     * @param {btVector3} wAxis The axis to rotate about 
     * @param {btScalar} angle The angle to rotate by 
     * @return {btVector3}
     */
    rotate: function( wAxis, angle ) {
        // wAxis must be a unit lenght vector
        /** @type {btVector3} */ var o = btVector3.op_mul_b( wAxis, wAxis.dot( this ) );
        /** @type {btVector3} */ var x = btVector3.op_sub( this, o );
        /** @type {btVector3} */ var y;

        y = wAxis.cross( this );

        return btVector3.op_add( 
                   btVector3.op_add( 
                       o,  
                       btVector3.op_mul_b( 
                           x, 
                           btCos( angle )
                       )
                   ), 
                   btVector3.op_mul_b( 
                       y, 
                       btSin( angle )
                   )
               );
    },
    /**
     * @brief Return the angle between this and another vector
     * @param {btVector3} v The other vector 
     * @return {btScalar}
     */
    angle: function( v ) {
        /** @type {btScalar} */ var s = btSqrt( this.length2() * v.length2() );
        return btAcos( this.dot( v ) / s);
    },
    /**
     * @brief Return a vector will the absolute values of each element 
     * @return {btVector3}
     */
    absolute: function() {
        return new btVector3(
           btFabs( this.m_floats[0] ),
           btFabs( this.m_floats[1] ),
           btFabs( this.m_floats[2] )
        );
    },
    /**
     * @brief Return the cross product between this and another vector 
     * @param {btVector3} v The other vector
     * @return {btVector3}
     */
    cross: function( v ) {
        return new btVector3(
            this.m_floats[1] * v.m_floats[2] - this.m_floats[2] * v.m_floats[1],
            this.m_floats[2] * v.m_floats[0] - this.m_floats[0] * v.m_floats[2],
            this.m_floats[0] * v.m_floats[1] - this.m_floats[1] * v.m_floats[0] );
    },
    /**
     * @param {btVector3} v1
     * @param {btVector3} v2
     * @return {btVector3}
     */
    triple: function( v1, v2 ) {
        return this.m_floats[0] * ( v1.m_floats[1] * v2.m_floats[2] - v1.m_floats[2] * v2.m_floats[1] ) +
               this.m_floats[1] * ( v1.m_floats[2] * v2.m_floats[0] - v1.m_floats[0] * v2.m_floats[2] ) +
               this.m_floats[2] * ( v1.m_floats[0] * v2.m_floats[1] - v1.m_floats[1] * v2.m_floats[0] );
    },
    /**
     * @brief Return the axis with the smallest value 
     * Note return values are 0,1,2 for x, y, or z 
     * @return {number}
     */
    minAxis: function() {
        return this.m_floats[0] < this.m_floats[1] ? (this.m_floats[0] <this.m_floats[2] ? 0 : 2) : (this.m_floats[1] <this.m_floats[2] ? 1 : 2);
    },
    /**
     * @brief Return the axis with the largest value 
     * Note return values are 0,1,2 for x, y, or z 
     * @return {number}
     */
    maxAxis: function() {
        return this.m_floats[0] < this.m_floats[1] ? (this.m_floats[1] <this.m_floats[2] ? 2 : 1) : (this.m_floats[0] <this.m_floats[2] ? 2 : 0);
    },
    /**
     * @return {number}
     */
    furthestAxis: function() {
        return this.absolute().minAxis();
    },
    /**
     * @return {number}
     */
    closestAxis: function() {
        return this.absolute().maxAxis();
    },
    /**
     * @param {btVector3} v0
     * @param {btVector3} v1
     * @param {btScalar} rt
     */
    setInterpolate3: function( v0, v1, rt ) {
        /** @type {btScalar} */ var s = 1 - rt;
        this.m_floats[0] = s * v0.m_floats[0] + rt * v1.m_floats[0];
        this.m_floats[1] = s * v0.m_floats[1] + rt * v1.m_floats[1];
        this.m_floats[2] = s * v0.m_floats[2] + rt * v1.m_floats[2];
        //don't do the unused w component
        //		m_co[3] = s * v0[3] + rt * v1[3];
    },
    /**
     * @brief Return the linear interpolation between this and another vector 
     * @param {btVector3} v The other vector 
     * @param {btScalar} t The ration of this to v (t = 0 => return this, t=1 => return other) 
     * @return {btVector3}
     */
    lerp: function( v, t ) {
        return new btVector3(
                this.m_floats[0] + (v.m_floats[0] - this.m_floats[0]) * t,
                this.m_floats[1] + (v.m_floats[1] - this.m_floats[1]) * t,
                this.m_floats[2] + (v.m_floats[2] - this.m_floats[2]) * t
               );
    },
    /**
     * @brief Elementwise multiply this vector by the other 
     * @param {btVector3} v The other vector 
     * @return {btVector3}
     */
    op_mul_b: function( v ) {
        this.m_floats[0] *= v.m_floats[0]; 
        this.m_floats[1] *= v.m_floats[1];
        this.m_floats[2] *= v.m_floats[2];
        return this;
    },
    /**
     * @brief Return the x value 
     * @return {btScalar}
     */
    getX: function() {
         return this.m_floats[ 0 ];
    },
    /**
     * @brief Return the y value 
     * @return {btScalar}
     */
    getY: function() {
         return this.m_floats[ 1 ];
    },
    /**
     * @brief Return the z value 
     * @return {btScalar}
     */
    getZ: function() {
         return this.m_floats[ 2 ];
    },
    /**
     * @brief Set the x value 
     * @param {btScalar} x
     */
    setX: function( x ) {
        this.m_floats[ 0 ] = x;
    },
    /**
     * @brief Set the y value 
     * @param {btScalar} y
     */
    setY: function( y ) {
        this.m_floats[ 1 ] = y;
    },
    /**
     * @brief Set the z value 
     * @param {btScalar} z
     */
    setZ: function( z ) {
        this.m_floats[ 2 ] = z;
    },
    /**
     * @brief Set the w value 
     * @param {btScalar} w
     */
    setW: function( w ) {
        this.m_floats[ 3 ] = w;
    },
    /**
     * @brief Return the x value 
     * @return {btScalar}
     */
    x: function() {
         return this.m_floats[ 0 ];
    },
    /**
     * @brief Return the y value 
     * @return {btScalar}
     */
    y: function() {
         return this.m_floats[ 1 ];
    },
    /**
     * @brief Return the z value 
     * @return {btScalar}
     */
    z: function() {
         return this.m_floats[ 2 ];
    },
    /**
     * @brief Return the z value 
     * @return {btScalar}
     */
    w: function() {
         return this.m_floats[ 3 ];
    },
    /**
     * @param {btVector3} other
     * @return {boolean}
     */
    op_eq: function( other ) {
        return ((this.m_floats[3] == other.m_floats[3]) && 
                (this.m_floats[2] == other.m_floats[2]) && 
                (this.m_floats[1] == other.m_floats[1]) && 
                (this.m_floats[0] == other.m_floats[0]) );
    },
    /**
     * @param {btVector3} other
     * @return {boolean}
     */
    op_neq: function( other ) {
        return !this.op_eq( other );
    },
    /**
     * @brief Set each element to the max of the current values and the values of another btVector3
     * @param {btVector3} other The other btVector3 to compare with 
     */
    setMax: function( other ) {
        btSetMax( this.m_floats[0], other.m_floats[0]);
        btSetMax( this.m_floats[1], other.m_floats[1]);
        btSetMax( this.m_floats[2], other.m_floats[2]);
        btSetMax( this.m_floats[3], other.w());
    },
    /**
     * @brief Set each element to the min of the current values and the values of another btVector3
     * @param {btVector3} other The other btVector3 to compare with 
     */
    setMin: function( other ) {
        btSetMin( this.m_floats[0], other.m_floats[0] );
        btSetMin( this.m_floats[1], other.m_floats[1] );
        btSetMin( this.m_floats[2], other.m_floats[2] );
        btSetMin( this.m_floats[3], other.w() );
    },
    /**
     * @param {btScalar} x
     * @param {btScalar} y
     * @param {btScalar} z
     */
    setValue: function( x, y, z ) {
        this.m_floats[0] = x;
        this.m_floats[1] = y;
        this.m_floats[2] = z;
        this.m_floats[3] = 0;
    },
    /**
     * @param {btVector3} v0
     * @param {btVector3} v1
     * @param {btVector3} v2
     */
    getSkewSymmetricMatrix: function( v0, v1, v2 ) {
        v0.setValue(         0, -this.z(),  this.y() );
        v1.setValue(  this.z(),         0, -this.x() );
        v2.setValue( -this.y(),  this.x(),         0 );
    },
    setZero: function() {
        this.setValue( 0, 0, 0 );
    },
    /**
     * @return {boolean}
     */
    isZero: function() {
        return  this.m_floats[0] === 0 && 
                this.m_floats[1] === 0 && 
                this.m_floats[2] === 0;
    },
    /**
     * @return {boolean}
     */
    fuzzyZero: function() {
        return this.length2() < SIMD_EPSILON;
    },
    /**
     * @param {btVector3FloatData} dataOut
     */
    serialize: function( dataOut ) {
        ///could also do a memcpy, check if it is worth it
        for ( var i = 0; i < 4; i++ ) {
            dataOut.m_floats[ i ] = this.m_floats[ i ];
        }
    },
    /**
     * @param {btVector3FloatData} dataIn
     */
    deSerialize: function( dataIn ) {
        for ( var i = 0; i < 4; i++ ) {
            this.m_floats[ i ] = dataIn.m_floats[ i ];
        }
    },
    /**
     * @param {btVector3FloatData} dataOut
     */
    serializeFloat: function( dataOut ) {
        ///could also do a memcpy, check if it is worth it
        for ( var i = 0; i < 4; i++ ) {
            dataOut.m_floats[ i ] = this.m_floats[ i ];
        }
    },
    /**
     * @param {btVector3FloatData} dataIn
     */
    deSerializeFloat: function( dataIn ) {
        for ( var i = 0; i < 4; i++ ) {
            this.m_floats[ i ] = dataIn.m_floats[ i ];
        }
    },
    /**
     * @param {btVector3DoubleData} dataOut
     */
    serializeDouble: function( dataOut ) {
        ///could also do a memcpy, check if it is worth it
        for ( var i = 0; i < 4; i++ ) {
            dataOut.m_floats[ i ] = this.m_floats[ i ];
        }
    },
    /**
     * @param {btVector3DoubleData} dataIn
     */
    deSerializeDouble: function( dataIn ) {
        for ( var i = 0; i < 4; i++ ) {
            this.m_floats[ i ] = dataIn.m_floats[ i ];
        }
    }
};

/**
 * @brief Return the sum of two vectors (Point semantics)
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btVector3}
 */
btVector3.op_add = function( v1, v2 ) {
    return new btVector3( 
        v1.m_floats[0] + v2.m_floats[0], 
        v1.m_floats[1] + v2.m_floats[1], 
        v1.m_floats[2] + v2.m_floats[2] );
};

/**
 * @deprecated
 */
btVector3.op_mul = function() {
};

/**
 * @brief Return the elementwise product of two vectors 
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btVector3}
 */
btVector3.op_mul_a = function( v1, v2 ) {
    return new btVector3(
        v1.m_floats[0] * v2.m_floats[0], 
        v1.m_floats[1] * v2.m_floats[1], 
        v1.m_floats[2] * v2.m_floats[2] );
};
 
/**
 * @brief Return the difference between two vectors 
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btVector3}
 */
btVector3.op_sub = function( v1, v2 ) {
    return new btVector3(
        v1.m_floats[0] - v2.m_floats[0], 
        v1.m_floats[1] - v2.m_floats[1], 
        v1.m_floats[2] - v2.m_floats[2]);
};

/**
 * @brief Return the negative of the vector 
 * @param {btVector3} v
 * @return {btVector3}
 */
btVector3.op_neg = function( v ) {
    return new btVector3(
        -v.m_floats[0], 
        -v.m_floats[1], 
        -v.m_floats[2] );
};

/**
 * @brief Return the vector scaled by s 
 * @param {btVector3} v
 * @param {btScalar} s
 * @return {btVector3}
 */
btVector3.op_mul_b = function( v, s ) {
    return new btVector3(
        v.m_floats[0] * s, 
        v.m_floats[1] * s, 
        v.m_floats[2] * s );
};

/**
 * @brief Return the vector scaled by s 
 * @param {btScalar} s
 * @param {btVector3} v
 * @return {btVector3}
 */
btVector3.op_mul_c = function( s, v ) {
    return new btVector3.op_mul_b( v, s );
};

/**
 * @deprecated
 */
btVector3.op_div = function() {
};

/**
 * @brief Return the vector inversely scaled by s 
 * @param {btVector3} v
 * @param {btScalar} s
 * @return {btVector3}
 */
btVector3.op_div_a = function( v, s ) {
    return new btVector3.op_mul_b( v, 1 / s );
};

/**
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btVector3}
 */
btVector3.op_div_b = function( v1, v2 ) {
    return btVector3(
        v1.m_floats[0] / v2.m_floats[0],
        v1.m_floats[1] / v2.m_floats[1],
        v1.m_floats[2] / v2.m_floats[2] );
};

/**
 * @brief Return the dot product between two vectors 
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btScalar}
 */
function btDot( v1, v2 ) {
    return v1.dot( v2 );
}

/**
 * @brief Return the distance squared between two vectors 
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btScalar}
 */
function btDistance2( v1, v2 ) {
    return v1.distance2( v2 );
}

/**
 * @brief Return the distance between two vectors 
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btScalar}
 */
function btDistance( v1, v2 ) {
    return v1.distance( v2 );
}

/**
 * @brief Return the angle between two vectors
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btScalar}
 */
function btAngle( v1, v2 ) {
    return v1.angle( v2 );
}

/**
 * @brief Return the cross product of two vectors
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @return {btVector3}
 */
function btCross( v1, v2 ) {
    return v1.cross( v2 );
}

/**
 * @brief Return the cross product of two vectors
 * @param {btVector3} v1
 * @param {btVector3} v2
 * @param {btVector3} v3
 * @return {btScalar}
 */
function btTriple( v1, v2, v3 ) {
    return v1.triple( v2, v3 );
}

/**
 * @brief Return the linear interpolation between two vectors
 * @param {btVector3} v1 One vector 
 * @param {btVector3} v2 The other vector 
 * @param {btScalar} t The ration of this to v (t = 0 => return v1, t=1 => return v2) 
 */
function lerp( v1, v2, t ) {
    return v1.lerp( v2, t );
}


/**
 * @param {btScalar=} x
 * @param {btScalar=} y
 * @param {btScalar=} z
 * @param {btScalar=} w
 * @constructor
 * @extends {btVector3}
 */
function btVector4( x, y, z, w ) {
    btVector3.call( this, x, y, z );
    this.m_floats[3] = w;
}

btVector4.prototype = {
    constructor: btVector4,
    /**
     * @return {btVector4}
     */
    absolute4: function() {
        return new btVector4(
            btFabs( this.m_floats[0] ),
            btFabs( this.m_floats[1] ),
            btFabs( this.m_floats[2] ),
            btFabs( this.m_floats[3] ) );
    },
    /**
     * @return {btScalar}
     */
    getW: function() {
        return this.m_floats[3];
    },
    /**
     * @return {number}
     */
    maxAxis4: function() {
        /** @type {number} */ var maxIndex = -1;
        /** @type {btScalar} */ var maxVal = -BT_LARGE_FLOAT;

        if ( this.m_floats[0] > maxVal ) {
            maxIndex = 0;
            maxVal = this.m_floats[0];
        }
        if ( this.m_floats[1] > maxVal ) {
            maxIndex = 1;
            maxVal = this.m_floats[1];
        }
        if ( this.m_floats[2] > maxVal ) {
            maxIndex = 2;
            maxVal = this.m_floats[2];
        }
        if ( this.m_floats[3] > maxVal ) {
            maxIndex = 3;
            maxVal = this.m_floats[3];
        }

        return maxIndex;
    },
    /**
     * @return {number}
     */
    minAxis4: function() {
        /** @type {number} */ var minIndex = -1;
        /** @type {btScalar} */ var minVal = BT_LARGE_FLOAT;

        if ( this.m_floats[0] < minVal ) {
            minIndex = 0;
            minVal = this.m_floats[0];
        }
        if ( this.m_floats[1] < minVal ) {
            minIndex = 1;
            minVal = this.m_floats[1];
        }
        if ( this.m_floats[2] < minVal ) {
            minIndex = 2;
            minVal = this.m_floats[2];
        }
        if ( this.m_floats[3] < minVal ) {
            minIndex = 3;
            minVal = this.m_floats[3];
        }

        return minIndex;
    },
    /**
     * @return {number}
     */
    closestAxis4: function() {
        return this.absolute4().maxAxis4();
    },
    /**
     * @brief Set the values 
     * @param {btScalar} x Value of x
     * @param {btScalar} y Value of y
     * @param {btScalar} z Value of z
     * @param {btScalar} w Value of w
     */
    setValue: function( x, y, z, w ) {
        this.m_floats[0] = x;
        this.m_floats[1] = y;
        this.m_floats[2] = z;
        this.m_floats[3] = w;
    }
};

/**
 * @deprecated
 */
function btSwapScalarEndian() {
}

///btSwapVector3Endian swaps vector endianness, useful for network and cross-platform serialization
/*inline void btSwapScalarEndian(const btScalar& sourceVal, btScalar& destVal)
{
# 653 "LinearMath/btVector3.h"
 unsigned char* dest = (unsigned char*) &destVal;
 unsigned char* src = (unsigned char*) &sourceVal;
 dest[0] = src[3];
    dest[1] = src[2];
    dest[2] = src[1];
    dest[3] = src[0];

}*/

/**
 * @deprecated
 */
function btSwapVector3Endian() {
}
///btSwapVector3Endian swaps vector endianness, useful for network and cross-platform serialization
/*inline void btSwapVector3Endian(const btVector3& sourceVec, btVector3& destVec)
{
 for (int i=0;i<4;i++)
 {
  btSwapScalarEndian(sourceVec[i],destVec[i]);
 }

}*/

/**
 * @deprecated
 */
function btUnSwapVector3Endian() {
}
///btUnSwapVector3Endian swaps vector endianness, useful for network and cross-platform serialization
/*inline void btUnSwapVector3Endian(btVector3& vector)
{

 btVector3 swappedVec;
 for (int i=0;i<4;i++)
 {
  btSwapScalarEndian(vector[i],swappedVec[i]);
 }
 vector = swappedVec;
}*/

/**
 * @param {btVector3} nV
 * @param {btVector3} pV
 * @param {btVector3} qV
 */
function btPlaneSpace1( nV, pV, qV ) {
    /** @type {btScalar} */ var a;
    /** @type {btScalar} */ var k;
    var n = nV.m_floats;
    var p = pV.m_floats;
    var q = qV.m_floats;

    if ( btFabs( n[ 2 ] ) > SIMDSQRT12 ) {
        // choose p in y-z plane
        a = n[1] * n[1] + n[2] * n[2];
        k = btRecipSqrt( a );
        p[0] = 0;
        p[1] = -n[2] * k;
        p[2] = n[1] * k;
        // set q = n x p
        q[0] = a * k;
        q[1] = -n[0] * p[2];
        q[2] = n[0] * p[1];
    }
    else {
        // choose p in x-y plane
        a = n[0] * n[0] + n[1] * n[1];
        k = btRecipSqrt( a );
        p[0] = -n[1] * k;
        p[1] = n[0] * k;
        p[2] = 0;
        // set q = n x p
        q[0] = -n[2] * p[1];
        q[1] = n[2] * p[0];
        q[2] = a * k;
    }
}

/**
 * @constructor
 */
function btVector3FloatData() {
    this.m_floats = new Float32Array( 4 );
}

/**
 * @constructor
 */
function btVector3DoubleData() {
    this.m_floats = new Float64Array( 4 );
}
