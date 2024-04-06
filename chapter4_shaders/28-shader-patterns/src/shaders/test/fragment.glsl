#define PI 3.14159

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233) * 43758.5143123)));
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}
float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main()
{
    /* Pattern 01
        gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
    */

    /*Pattern 02
        gl_FragColor = vec4(vUv, 0.0, 1.0);
    */

    /* Pattern 03
        gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);
    */

    /* Pattern 04
        float strength = vUv.y;
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */

    /* Pattern 05
        float strength = 1.0 - vUv.y;
        gl_FragColor = vec4(strength, strength, strength, 1.0);
     */

    /* Pattern 06
        float strength = vUv.y * 10.0;
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */

    /* Pattern 07
        float strength = mod(vUv.y * 10.0, 1.0);
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */

    /* Pattern 08
        // Conditionals are bad for performance
    
        float strength = mod(vUv.y * 10.0, 1.0);
        // if(strength < 0.5){
        //     strength = 0.0;
        // }else {
        //     strength = 1.0;
        // }

        // strength = strength < 0.5 ? 0.0 : 1.0

        strength = step(0.5, strength);   
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */

    /* Pattern 09
        float strength = mod(vUv.y * 10.0, 1.0);
        strength = step(0.9, strength);   
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */

    /* Pattern 10
        float strength = mod(vUv.x * 10.0, 1.0);
        strength = step(0.8, strength);   
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */

    /* Pattern 11
        float strength = 0.0;
        strength += step(0.8, mod(vUv.x * 10.0, 1.0));
        strength += step(0.8, mod(vUv.y * 10.0, 1.0));   
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */    

    /* Pattern 12
        float strength = 0.0;
        strength += step(0.8, mod(vUv.x * 10.0, 1.0));
        strength *= step(0.8, mod(vUv.y * 10.0, 1.0));  
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */

    /* Pattern 13
        float strength = 0.0;
        strength += step(0.4, mod(vUv.x * 10.0, 1.0));
        strength *= step(0.8, mod(vUv.y * 10.0, 1.0));  
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */

    /* Pattern 14
        float ybar = 0.0;
        float xbar = 0.0;
        float offset = 0.2;
        float strength = 0.0;
        ybar += step(0.8, mod(vUv.y * 10.0 + offset, 1.0));
        ybar *= step(0.4, mod(vUv.x * 10.0, 1.0)); 

        xbar += step(0.8, mod(vUv.x * 10.0 + offset, 1.0));
        xbar *= step(0.4, mod(vUv.y * 10.0, 1.0));

        strength = xbar + ybar;
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */
    /* Pattern 15
        float ybar = 0.0;
        float xbar = 0.0;
        float offset = 0.2;

        xbar += step(0.4, mod(vUv.x * 10.0 , 1.0));
        xbar *= step(0.8, mod(vUv.y * 10.0 + offset, 1.0));

        ybar += step(0.8, mod(vUv.x * 10.0 + offset, 1.0));
        ybar *= step(0.4, mod(vUv.y * 10.0, 1.0)); 

        float strength = xbar + ybar;
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */
    /* Pattern 16
        float strength = abs(vUv.x - 0.5);
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */
    /* Pattern 17
        float strength = min(abs(vUv.x - 0.5), abs(0.5 - vUv.y));
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */
    /* Pattern 18
        float strength = max(abs(vUv.x - 0.5), abs(0.5 - vUv.y));
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */
    /* Pattern 19
        float strength = step(0.2, max(abs(vUv.x - 0.5), abs(0.5 - vUv.y)));
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */
    /* Pattern 20
        float square1 =  step(0.2, max(abs(vUv.x - 0.5), abs(0.5 - vUv.y)));
        float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
        float strength = square1 * square2;
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */
    /* Pattern 21
        float strength = floor(vUv.x * 10.0) / 10.0;
        gl_FragColor = vec4(strength, strength, strength, 1.0);
    */
    /* 
        Pattern 22
    */

    // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);
    
    /* 
        Pattern 23
    */
    // float strength = random(vUv);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 24
    */
        // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
        // float strength = random( gridUv );
        // gl_FragColor = vec4(strength, strength, strength, 1.0);
    /* 
        Pattern 25
    */
        // vec2 gridUv = vec2(
        //     floor(vUv.x * 10.0) / 10.0, 
        //     floor((vUv.y+ vUv.x) * 5.0 ) / 10.0 
        // );
        // float strength = random( gridUv );
        // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 26
    */  
        // float strength = length(vUv);
        // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 27
    */
        // float strength = distance(vUv, vec2(0.5, 0.5));
        // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 28
    */
        // float strength = 1.0-distance(vUv, vec2(0.5, 0.5));
        // gl_FragColor = vec4(strength, strength, strength, 1.0);
    /* 
        Pattern 29
    */
        // float strength = 0.015 / distance(vUv, vec2(0.5, 0.5)) ;
        // gl_FragColor = vec4(strength, strength, strength, 1.0);
    /* 
        Pattern 30
    */
        // vec2 lightUv = vec2(
        //     vUv.x * 0.1 + 0.45,
        //     vUv.y * 0.5 + 0.25
        // );
        // float strength = 0.015 / distance(lightUv, vec2(0.5, 0.5)) ;
        // gl_FragColor = vec4(strength, strength, strength, 1.0);
    /* 
        Pattern 31
    */
        // vec2 lightUvX = vec2(
        //     vUv.x * 0.1 + 0.45,
        //     vUv.y * 0.5 + 0.25
        // );
        // vec2 lightUvY = vec2(
        //     vUv.x * 0.5 + 0.25,
        //     vUv.y * 0.1 + 0.45
        // );
        // float lightX = 0.015 / distance(  lightUvX, vec2(0.5, 0.5)) ;
        // float lightY = 0.015 / distance(  lightUvY, vec2(0.5, 0.5)) ;
        // float strength = lightX * lightY ;
        // gl_FragColor = vec4(strength, strength, strength, 1.0);
    /* 
        Pattern 32
    */
    // vec2 rotatedUv = rotate(vUv, PI/4.0, vec2(0.5,0.5));

    // vec2 lightUvX = vec2(
    //     rotatedUv.x * 0.1 + 0.45,
    //     rotatedUv.y * 0.5 + 0.25
    // );
    // vec2 lightUvY = vec2(
    //     rotatedUv.x * 0.5 + 0.25,
    //     rotatedUv.y * 0.1 + 0.45
    // );
    // float lightX = 0.015 / distance(  lightUvX, vec2(0.5, 0.5)) ;
    // float lightY = 0.015 / distance(  lightUvY, vec2(0.5, 0.5)) ;
    // float strength = lightX * lightY ;

    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 33
    */
    // float strength = step(0.25, distance(vUv, vec2(0.5, 0.5)));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 34
    */
    // float strength = step(0.01,abs(0.25 - distance(vUv, vec2(0.5, 0.5))));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 35
    */
    // float strength = 1.0 - step(0.01,abs(0.25 - distance(vUv, vec2(0.5, 0.5))));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 36
    */
    // float strength = 1.0 - step(0.01,abs(0.25 - distance(vUv, vec2(0.5, 0.5))));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 37
    */
    // vec2 wavedUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01,abs(0.25 - distance(wavedUv, vec2(0.5, 0.5))));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 38
    */
    // vec2 wavedUv = vec2(
    //     vUv.x+ sin(vUv.y * 30.0) * 0.1,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01,abs(0.25 - distance(wavedUv, vec2(0.5, 0.5))));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 39
    */
    // vec2 wavedUv = vec2(
    //     vUv.x+ sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01,abs(0.25 - distance(wavedUv, vec2(0.5, 0.5))));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 40
    */
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 41
    */
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 42
    */
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float strength = angle;
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 43
    */
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // angle *= 20.0;
    // float strength = mod(angle, 1.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 44
    */
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float strength = sin(angle * 100.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);
    
    /* 
        Pattern 45
    */
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float sinusoid = sin(angle * 100.0);
    // float radius = 0.25 + sinusoid * 0.02;
    // float strength = 1.0 - step(0.01,abs(distance(vUv, vec2(0.5, 0.5)) - radius));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 46 - Perlin Noise
    */
    // float strength = cnoise(vUv * 10.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 47
    */
    // float strength = step(0.0, cnoise(vUv * 10.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 48
    */
    // float strength = 1.0 - abs(cnoise(vUv * 10.0));
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 49
    */
    // float strength = sin(cnoise(vUv * 10.0) * 20.0);
    // gl_FragColor = vec4(strength, strength, strength, 1.0);

    /* 
        Pattern 50
    */
    float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);
        // Black and WHite
    // gl_FragColor = vec4(strength, strength, strength, 1.0);
}