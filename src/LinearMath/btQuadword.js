/**
 * @brief The btQuadWord class is base class for btVector3 and btQuaternion. 
 * Some issues under PS3 Linux with IBM 2.1 SDK, gcc compiler prevent from using aligned quadword.

 * @param {btScalar=} x Value of x
 * @param {btScalar=} y Value of y
 * @param {btScalar=} z Value of z
 * @param {btScalar=} w Value of w
 * @constructor
 */
function btQuadWord( x, y, z, w ) {
    /** @protected */
    this.m_floats = new Float32Array( 4 );

    this.m_floats[0] = x; 
    this.m_floats[1] = y;
    this.m_floats[2] = z;
    this.m_floats[3] = w;
}

btQuadWord.prototype = {
    constructor: btQuadWord,
    /**
     * @brief Return the x value 
     * @return {btScalar}
     */
    getX: function() { 
        return this.m_floats[0]; 
    },
    /**
     * @brief Return the y value 
     * @return {btScalar}
     */
    getY: function() { 
        return this.m_floats[1]; 
    },
    /**
     * @brief Return the z value 
     * @return {btScalar}
     */
    getZ: function() { 
        return this.m_floats[2]; 
    },
    /**
     * @brief Set the x value 
     * @param {btScalar} x
     */
    setX: function( x ) { 
        this.m_floats[0] = x;
    },
    /**
     * @brief Set the y value 
     * @param {btScalar} x
     */
    setY: function( y ) { 
        this.m_floats[1] = y;
    },
    /**
     * @brief Set the z value 
     * @param {btScalar} x
     */
    setZ: function( z ) { 
        this.m_floats[2] = z;
    },
    /**
     * @brief Set the w value 
     * @param {btScalar} x
     */
    setW: function( w ) { 
        this.m_floats[3] = w;
    },
    /**
     * @brief Return the x value 
     * @return {btScalar}
     */
    x: function() { 
        return this.m_floats[0]; 
    },
    /**
     * @brief Return the y value 
     * @return {btScalar}
     */
    y: function() { 
        return this.m_floats[1]; 
    },
    /**
     * @brief Return the z value 
     * @return {btScalar}
     */
    z: function() { 
        return this.m_floats[2]; 
    },
    /**
     * @brief Return the w value 
     * @return {btScalar}
     */
    w: function() { 
        return this.m_floats[3]; 
    },
    /**
     * @param {number} n
     * @return {number}
     */
    op_get: function( n ) {
        return this.m_floats[ n ];
    },
    /**
     * @param {btQuadWord} other
     * @return {boolean}
     */
    op_eq: function( other ) {
        return (
            m_floats[3] == other.m_floats[3] && 
            m_floats[2] == other.m_floats[2] && 
            m_floats[1] == other.m_floats[1] && 
            m_floats[0] == other.m_floats[0] );

    },
    /**
     * @param {btQuadWord} other
     * @return {boolean}
     */
    op_neq: function( other ) {
        return !this.op_eq( other );
    },
    /**
     * @deprecated
     */
    setValue: function() {
    },
    /**
     * @brief set x,y,z and zero w 
     * @param {btScalar} x value of x
     * @param {btScalar} y value of y
     * @param {btScalar} z value of z
     */
    setValue_a: function( x, y, z ) {
        this.m_floats[0] = x;
        this.m_floats[1] = y;
        this.m_floats[2] = z;
        this.m_floats[3] = 0;
    },
    /**
     * @brief Set the values 
     * @param {btScalar} x value of x
     * @param {btScalar} y value of y
     * @param {btScalar} z value of z
     * @param {btScalar} w value of w
     */
    setValue_b: function( x, y, z, w ) {
        this.m_floats[0] = x;
        this.m_floats[1] = y;
        this.m_floats[2] = z;
        this.m_floats[3] = w;
    },
    /**
     * @brief Set each element to the max of the current values and the values of another btQuadWord
     * @param {btQuadWord} other The other btQuadWord to compare with 
     */
    setMax: function( other ) {
        btSetMax(m_floats[0], other.m_floats[0]);
        btSetMax(m_floats[1], other.m_floats[1]);
        btSetMax(m_floats[2], other.m_floats[2]);
        btSetMax(m_floats[3], other.m_floats[3]);
    },
    /**
     * @brief Set each element to the min of the current values and the values of another btQuadWord
     * @param {btQuadWord} other The other btQuadWord to compare with 
     */
    setMin: function( other ) {
        btSetMin(m_floats[0], other.m_floats[0]);
        btSetMin(m_floats[1], other.m_floats[1]);
        btSetMin(m_floats[2], other.m_floats[2]);
        btSetMin(m_floats[3], other.m_floats[3]);
    }
};
