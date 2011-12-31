/** @typedef {btQuaternion|btQuaternion_a|btQuaternion_b|btQuaternion_c} */
var btQuaternion;

/**
 * @brief The btQuaternion implements quaternion to perform linear algebra rotations in combination with btMatrix3x3, btVector3 and btTransform. 
 * @deprecated
 * @constructor
 */
btQuaternion = function btQuaternion() {
    btQuadWord.call( this );
}

/**
 * @param {btScalar} x
 * @param {btScalar} y
 * @param {btScalar} z
 * @param {btScalar} w
 * @constructor
 */
function btQuaternion_a( x, y, z, w ) {
    btQuadWord.call( this, x, y, z, w );
}

/**
 * @brief Axis angle Constructor
 * @param {btVector3} axis
 * @param {btScalar} angle
 * @constructor
 */
function btQuaternion_b( axis, angle ) {
    btQuadWord.call( this );
    this.setRotation( axis, angle );
}

/**
 * @brief Constructor from Euler angles
 * @param {btScalar} yaw Angle around Y unless BT_EULER_DEFAULT_ZYX defined then Z
 * @param {btScalar} pitch Angle around X unless BT_EULER_DEFAULT_ZYX defined then Y
 * @param {btScalar} roll Angle around Z unless BT_EULER_DEFAULT_ZYX defined then X
 * @constructor
 */
function btQuaternion_c( yaw, pitch, roll ) {
    btQuadWord.call( this );
    this.setEuler( yaw, pitch, roll );
}

btQuaternion.prototype = 
btQuaternion_a.prototype = 
btQuaternion_b.prototype = 
btQuaternion_c.prototype = {
    constructor: btQuaternion,
    /**
     * @brief Set the rotation using axis angle notation 
     * @param {btVector3} axis The axis around which to rotate
     * @param {btVector3} angle The magnitude of the rotation in Radians 
     */
    setRotation: function( axis, angle ) {
        /** {btScalar} */ var d = axis.length();
        /** {btScalar} */ var s = btSin( angle * 0.5 ) / d;
        this.setValue( 
            axis.x() * s, 
            axis.y() * s, 
            axis.z() * s,
            btCos( angle * 0.5 ) );
    },
    /**
     * @brief Set the quaternion using Euler angles
     * @param {btScalar} yaw Angle around Y
     * @param {btScalar} pitch Angle around X
     * @param {btScalar} roll Angle around Z 
     */
    setEuler: function( yaw, pitch, roll ) {
        /** @type {btScalar} */ var halfYaw = yaw * 0.5;
        /** @type {btScalar} */ var halfPitch = pitch * 0.5;
        /** @type {btScalar} */ var halfRoll = roll * 0.5;
        /** @type {btScalar} */ var cosYaw = btCos( halfYaw );
        /** @type {btScalar} */ var sinYaw = btSin( halfYaw );
        /** @type {btScalar} */ var cosPitch = btCos( halfPitch );
        /** @type {btScalar} */ var sinPitch = btSin( halfPitch );
        /** @type {btScalar} */ var cosRoll = btCos( halfRoll );
        /** @type {btScalar} */ var sinRoll = btSin( halfRoll );
        this.setValue(
            cosRoll * sinPitch * cosYaw + sinRoll * cosPitch * sinYaw,
            cosRoll * cosPitch * sinYaw - sinRoll * sinPitch * cosYaw,
            sinRoll * cosPitch * cosYaw - cosRoll * sinPitch * sinYaw,
            cosRoll * cosPitch * cosYaw + sinRoll * sinPitch * sinYaw );
    },
    /**
     * @brief Set the quaternion using euler angles 
     * @param {btScalar} yaw Angle around Z
     * @param {btScalar} pitch Angle around Y
     * @param {btScalar} roll Angle around X 
     */
    setEulerZYX: function( yaw, pitch, roll ) {
        /** @type {btScalar} */ var halfYaw = yaw * 0.5;
        /** @type {btScalar} */ var halfPitch = pitch * 0.5;
        /** @type {btScalar} */ var halfRoll = roll * 0.5;
        /** @type {btScalar} */ var cosYaw = btCos( halfYaw );
        /** @type {btScalar} */ var sinYaw = btSin( halfYaw );
        /** @type {btScalar} */ var cosPitch = btCos( halfPitch );
        /** @type {btScalar} */ var sinPitch = btSin( halfPitch );
        /** @type {btScalar} */ var cosRoll = btCos( halfRoll );
        /** @type {btScalar} */ var sinRoll = btSin( halfRoll );
        this.setValue(
            sinRoll * cosPitch * cosYaw - cosRoll * sinPitch * sinYaw, //x
            cosRoll * sinPitch * cosYaw + sinRoll * cosPitch * sinYaw, //y
            cosRoll * cosPitch * sinYaw - sinRoll * sinPitch * cosYaw, //z
            cosRoll * cosPitch * cosYaw + sinRoll * sinPitch * sinYaw ); //formerly yzx
    },
    /**
     * @brief Add two quaternions
     * @param {btQuaternion} q The quaternion to add to this one 
     */
    op_addeq: function( q ) {
        this.m_floats[0] += q.x();
        this.m_floats[1] += q.y();
        this.m_floats[2] += q.z();
        this.m_floats[3] += q.m_floats[3];
        return this;
    },
    /**
     * @brief Subtract out a quaternion
     * @param q The quaternion to subtract from this one 
     */
    op_subeq: function( q ) {
        this.m_floats[0] -= q.x();
        this.m_floats[1] -= q.y();
        this.m_floats[2] -= q.z();
        this.m_floats[3] -= q.m_floats[3];
        return this;
    },
    /**
     * @deprecated
     */
    op_muleq: function() {
    },
    /**
     * @brief Scale this quaternion
     * @param {btScalar} s The scalar to scale by
     * @return {btQuaternion}
     */
    op_muleq_a: function( s ) {
        this.m_floats[0] *= s;
        this.m_floats[1] *= s;
        this.m_floats[2] *= s;
        this.m_floats[3] *= s;
        return this;
    },
    /**
     * @brief Multiply this quaternion by q on the right
     * Equivilant to this = this * q 
     * @param {btQuaternion} q The other quaternion 
     * @return {btQuaternion}
     */
    op_muleq_b: function( q ) {
        this.setValue(
            this.m_floats[3] * q.x() + this.m_floats[0] * q.m_floats[3] + 
            this.m_floats[1] * q.z() - this.m_floats[2] * q.y(),

            this.m_floats[3] * q.y() + this.m_floats[1] * q.m_floats[3] + 
            this.m_floats[2] * q.x() - this.m_floats[0] * q.z(),

            this.m_floats[3] * q.z() + this.m_floats[2] * q.m_floats[3] + 
            this.m_floats[0] * q.y() - this.m_floats[1] * q.x(),

            this.m_floats[3] * q.m_floats[3] - this.m_floats[0] * q.x() - 
            this.m_floats[1] * q.y() - this.m_floats[2] * q.z()
        );
        return this;
    },
    /**
     * @brief Return the dot product between this quaternion and another
     * @param {btQuaternion} q The other quaternion 
     * @return {btScalar}
     */
    dot: function( q ) {
        return  this.m_floats[0] * q.x() + 
                this.m_floats[1] * q.y() + 
                this.m_floats[2] * q.z() + 
                this.m_floats[3] * q.m_floats[3];
    },
    /**
     * @brief Return the length squared of the quaternion 
     * @return {btScalar}
     */
    length2: function() {
        return this.dot( this );
    },
    /**
     * @brief Return the length of the quaternion 
     * @return {btScalar}
     */
    length: function() {
        return btSqrt( this.length2() );
    },
    /**
     * @brief Normalize the quaternion 
     * Such that x^2 + y^2 + z^2 +w^2 = 1 
     * @return {btQuaternion}
     */
    normalize: function() {
        return this.op_div( this.length() );
    },
    /**
     * @brief Return a scaled version of this quaternion
     * @param {btScalar} s The scale factor 
     * @return {btQuaternion}
     */
    op_mul: function( s ) {
        return new btQuaternion_a(
            this.x() * s, 
            this.y() * s, 
            this.z() * s, 
            this.m_floats[3] * s );
    },
    /**
     * @brief Return an inversely scaled versionof this quaternion
     * @param {btScalar} s The inverse scale factor 
     * @return {btQuaternion}
     */
    op_div: function( s ) {
        return this.op_mul( 1 / s );
    },
    /**
     * @brief Inversely scale this quaternion
     * @param {btScalar} s The scale factor 
     * @return {btQuaternion}
     */
    op_diveq: function( s ) {
        return this.op_muleq_a( 1 / s );
    },
    /**
     * @brief Return a normalized version of this quaternion 
     * @return {btQuaternion}
     */
    normalized: function() {
        return this.op_div( this.length() );
    },
    /**
     * @brief Return the angle between this quaternion and the other 
     * @param {btQuaternion} q The other quaternion
     * @return {btScalar}
     */
    angle: function( q ) {
        /** @type {btScalar} */ var s = btSqrt( this.length2() * q.length2());
        return btAcos( this.dot(q) / s );
    },
    /**
     * @brief Return the angle of rotation represented by this quaternion 
     * @return {btScalar}
     */
    getAngle: function() {
        /** @type {btScalar} */ var s = 2 * btAcos( this.m_floats[3] );
        return s;
    },
    /**
     * @brief Return the axis of the rotation represented by this quaternion 
     * @return {btVector3}
     */
    getAxis: function() {
        /** @type {btScalar} */ var s_squared = 1 - this.m_floats[3] * this.m_floats[3];

        if ( s_squared < 10 * SIMD_EPSILON ) { //Check for divide by zero
            return btVector3( 1, 0, 0 ); // Arbitrary
        }
        /** @type {btScalar} */ var s = 1 / btSqrt( s_squared );
        return new btVector3(
            this.m_floats[0] * s, 
            this.m_floats[1] * s, 
            this.m_floats[2] * s );
    },
    /**
     * @brief Return the inverse of this quaternion
     * @return {btQuaternion}
     */
    inverse: function() {
        return new btQuaternion_a(
            -this.m_floats[0], 
            -this.m_floats[1], 
            -this.m_floats[2], 
             this.m_floats[3] );
    },
    /**
     * @brief Return the sum of this quaternion and the other 
     * @param {btQuaternion} q2 The other quaternion 
     * @return {btQuaternion}
     */
    op_add: function( q2 ) {
        /** @type {btQuaternion} */ var q1 = this;
        return new btQuaternion(
            q1.x() + q2.x(), 
            q1.y() + q2.y(), 
            q1.z() + q2.z(), 
            q1.m_floats[3] + q2.m_floats[3] );
    },
    /**
     * @brief Return the difference between this quaternion and the other 
     * @param {btQuaternion} q2 The other quaternion
     * @return {btQuaternion}
     */
    op_sub: function( q2 ) {
        /** @type {btQuaternion} */ var q1 = this;
        return new btQuaternion(
            q1.x() - q2.x(), 
            q1.y() - q2.y(), 
            q1.z() - q2.z(), 
            q1.m_floats[3] - q2.m_floats[3] );
    },
    /**
     * @brief Return the negative of this quaternion 
     * This simply negates each element 
     * @return {btQuaternion}
     */
    op_neg: function() {
        /** @type {btQuaternion} */ var q2 = this;
        return new btQuaternion( -q2.x(), - q2.y(), - q2.z(), - q2.m_floats[3] );
    },
    /**
     * @todo document this and it's use 
     * @param {btQuaternion} qd
     * @return {btQuaternion}
     */
    farthest: function( qd ) {
        /** @type {btQuaternion} */ var diff,sum;
        diff = this.op_sub( qd );
        sum = this.op_add( qd );
        if( diff.dot( diff ) > sum.dot( sum ) ) {
            return qd;
        }
        return qd.op_neg();
    },
    /**
     * @todo document this and it's use 
     * @param {btQuaternion} qd
     * @return {btQuaternion}
     */
    nearest: function( qd ) {
        /** @type {btQuaternion} */ var diff,sum;
        diff = this.op_sub( qd );
        sum = this.op_add( qd );
        if( diff.dot( diff ) < sum.dot( sum ) ) {
            return qd;
        }
        return qd.op_neg();
    },
    /**
     * @brief Return the quaternion which is the result of Spherical Linear Interpolation between this and the other quaternion
     * @param {btQuaternion} q The other quaternion to interpolate with 
     * @param {btScalar} t The ratio between this and q to interpolate.  If t = 0 the result is this, if t=1 the result is q.
     * Slerp interpolates assuming constant velocity.  
     */
    slerp: function( q, t ) {
        /** @type {btScalar} */ var theta = this.angle( q );
        if ( theta !== 0 ) {
            /** @type {btScalar} */ var d = 1 / btSin( theta );
            /** @type {btScalar} */ var s0 = btSin( ( 1 - t ) * theta );
            /** @type {btScalar} */ var s1 = btSin( t * theta );
            if ( this.dot( q ) < 0 ) { // Take care of long angle case see http://en.wikipedia.org/wiki/Slerp
                return new btQuaternion(
                    (this.m_floats[0] * s0 + -q.x() * s1) * d,
                    (this.m_floats[1] * s0 + -q.y() * s1) * d,
                    (this.m_floats[2] * s0 + -q.z() * s1) * d,
                    (this.m_floats[3] * s0 + -q.m_floats[3] * s1) * d);
            }
            else {
                return new btQuaternion(
                    (this.m_floats[0] * s0 + q.x() * s1) * d,
                    (this.m_floats[1] * s0 + q.y() * s1) * d,
                    (this.m_floats[2] * s0 + q.z() * s1) * d,
                    (this.m_floats[3] * s0 + q.m_floats[3] * s1) * d);
            }
        }
        else {
            return this;
        }
    },
    /**
     * @return {btScalar}
     */
    getW: function() {
        return this.m_floats[3];
    }
};

/**
 * @return {btQuaternion}
 */
btQuaternion.getIdentity = function() {
    var identityQuat = new btQuaternion( 0, 0, 0, 1 );
    return identityQuat;
};

/**
 * @deprecated
 */
btQuaternion.op_mul = function() {
};

/**
 * @brief Return the product of two quaternions
 * @param {btQuaternion} q1
 * @param {btQuaternion} q2
 * @return {btQuaternion}
 */
btQuaternion.op_mul_a = function( q1, q2 ) {
    return new btQuaternion(
        q1.w() * q2.x() + q1.x() * q2.w() + 
        q1.y() * q2.z() - q1.z() * q2.y(),

        q1.w() * q2.y() + q1.y() * q2.w() + 
        q1.z() * q2.x() - q1.x() * q2.z(),

        q1.w() * q2.z() + q1.z() * q2.w() + 
        q1.x() * q2.y() - q1.y() * q2.x(),

        q1.w() * q2.w() - q1.x() * q2.x() - 
        q1.y() * q2.y() - q1.z() * q2.z() );
};

/**
 * @param {btQuaternion} q
 * @param {btVector3} w
 * @return {btQuaternion}
 */
btQuaternion.op_mul_b = function( q, w ) {
    return new btQuaternion( 
        q.w() * w.x() + q.y() * w.z() - q.z() * w.y(),
        q.w() * w.y() + q.z() * w.x() - q.x() * w.z(),
        q.w() * w.z() + q.x() * w.y() - q.y() * w.x(),
       -q.x() * w.x() - q.y() * w.y() - q.z() * w.z() );
};

/**
 * @param {btVector3} w
 * @param {btQuaternion} q
 * @return {btQuaternion}
 */
btQuaternion.op_mul_c = function( w, q ) {
    return btQuaternion( 
        w.x() * q.w() + w.y() * q.z() - w.z() * q.y(),
        w.y() * q.w() + w.z() * q.x() - w.x() * q.z(),
        w.z() * q.w() + w.x() * q.y() - w.y() * q.x(),
       -w.x() * q.x() - w.y() * q.y() - w.z() * q.z() );
};

/**
 * @brief Calculate the dot product between two quaternions 
 * @param {btQuaternion} q1
 * @param {btQuaternion} q2
 * @return {btScalar}
 */
btQuaternion.dot = function( q1, q2 ) {
    return q1.dot( q2 );
};

/**
 * @brief Return the length of a quaternion 
 * @param {btQuaternion} q
 * @return {btScalar}
 */
btQuaternion.length = function( q ) {
    return q.length();
};

/**
 * @brief Return the angle between two quaternions
 * @param {btQuaternion} q1
 * @param {btQuaternion} q2
 * @return {btScalar}
 */
btQuaternion.angle = function( q1, q2 ) {
    return q1.angle( q2 );
};

/**
 * @brief Return the inverse of a quaternion
 * @param {btQuaternion} q
 * @return {btQuaternion}
 */
btQuaternion.inverse = function( q ) {
    return q.inverse();
};

/**
 * @brief Return the result of spherical linear interpolation betwen two quaternions 
 * Slerp assumes constant velocity between positions. 
 * @param {btQuaternion} q1 The first quaternion
 * @param {btQuaternion} q2 The second quaternion 
 * @param {btScalar} t The ration between q1 and q2.  t = 0 return q1, t=1 returns q2 
 * @return {btQuaternion}
 */
btQuaternion.slerp = function( q1, q2, t ) {
    return q1.slerp(q2, t);
};

/**
 * @param {btQuaternion} rotation
 * @param {btVector3} v
 * @return {btVector3}
 */
btQuaternion.quatRotate = function( rotation, v ) {
    var q = btQuaternion.op_mul_a( rotation, v );
    q.op_muleq( rotation.inverse() );
    return new btVector3( q.getX(), q.getY(), q.getZ() );
};

/**
 * @param {btVector3} v0
 * @param {btVector3} v1
 * @return {btQuaternion}
 */
btQuaternion.shortestArcQuat = function( v0, v1 ) { // Game Programming Gems 2.10. make sure v0,v1 are normalized
    /** @type {btVector3} */ var c = v0.cross( v1 );
    /** @type {btScalar} */ var d = v0.dot( v1 );

    if ( d < -1 + SIMD_EPSILON ) {
        /** @type {btVector3} */ var n, unused;
        btPlaneSpace1( v0, n, unused );
        return new btQuaternion( n.x(), n.y(), n.z(), 0 ); // just pick any vector that is orthogonal to v0
    }

    /** @type {btScalar} */ var s = btSqrt( ( 1 + d ) * 2 );
    /** @type {btScalar} */ var rs = 1 / s;

    return new btQuaternion(
        c.getX() * rs,
        c.getY() * rs,
        c.getZ() * rs,
        s * 0.5 );
};

/**
 * @param {btVector3} v0
 * @param {btVector3} v1
 * @return {btQuaternion}
 */
btQuaternion.shortestArcQuatNormalize2 = function( v0, v1 ) {
    v0.normalize();
    v1.normalize();
    return btQuaternion.shortestArcQuat( v0, v1 );
};
