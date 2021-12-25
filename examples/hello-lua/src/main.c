#include <stdlib.h>
#include <stdio.h>

#include "lua.h"
#include "lauxlib.h"
#include "lualib.h"

int main(int argc, char *argv[]) {
    int error;
    lua_State *L = luaL_newstate();
    luaL_openlibs(L);

    error = luaL_dofile(L, argv[1]);
    if (error) {
        fprintf(stderr, "%s\n", lua_tostring(L, -1));
        lua_pop(L, 1);  /* pop error message from the stack */
    }

    lua_close(L);
    return error;
}