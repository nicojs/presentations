// https://github.com/nodejs/node/tree/master/test/addons-napi
#include <node_api.h>
#include <string.h>

static napi_value Method(napi_env env, napi_callback_info info) {
  napi_value world;
  const char* str = "world";
  size_t str_len = strlen(str);
  napi_create_string_utf8(env, str, str_len, &world);
  return world;
}

NAPI_MODULE_INIT() {
  napi_property_descriptor desc =  { "hello", 0, Method, 0, 0, 0, napi_default, 0 };
  napi_define_properties(env, exports, 1, &desc);
  return exports;
}