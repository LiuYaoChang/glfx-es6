import Shader from '../../shader'
import {simpleShader, clamp} from '../../util'
import * as store from '../../store'

/**
 * @filter         Sepia
 * @description    Gives the image a reddish-brown monochrome tint that imitates an old photograph.
 * @param temperature   -100 to 100 (0 for no effect, 1 for full sepia coloring)
 */
export default function(temperature) {
  var gl = store.get('gl')
  gl.temperature = gl.temperature || new Shader(null, '\
    uniform sampler2D texture;\
    uniform float temperature;\
    varying vec2 texCoord;\
    void main() {\
      vec4 color = texture2D(texture, texCoord);\
      float r = color.r;\
      float g = color.g;\
      float b = color.b;\
      float level = temperature /2;\
      \
      color.r = clamp(r, 0, 255);\
      color.g = clamp(g + level, 0, 255);\
      color.b = clamp(b - level, 0, 255);\
      \
      gl_FragColor = color;\
    }\
  ');

  simpleShader.call(this, gl.temperature, {
    temperature: clamp(-100, temperature, 100)
  });

  return this;
}
