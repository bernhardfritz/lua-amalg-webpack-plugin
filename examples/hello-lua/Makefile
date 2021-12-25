ifeq ($(origin CC),default)
CC = gcc
endif
MKDIR_P ?= mkdir -p
SRC_DIR := src
_SRCS := main.c
SRCS := $(_SRCS:%=$(SRC_DIR)/%)
_BUILD_DIR := build
BUILD_DIR := $(_BUILD_DIR)/$(if $(EMSCRIPTEN),web,native)
_OBJS := $(_SRCS:%.c=%.o)
OBJS := $(_SRCS:%.c=$(BUILD_DIR)/%.o)
LUA_VERSION := 5.4.3

$(BUILD_DIR)/%.o: $(SRC_DIR)/%.c $(BUILD_DIR)/lua-$(LUA_VERSION)/src/liblua.a
	$(CC) -I$(BUILD_DIR)/lua-$(LUA_VERSION)/src -c $< -o $@

all: $(OBJS)
	$(CC) $(if $(EMSCRIPTEN),--pre-js pre.js) $(OBJS) -L$(BUILD_DIR)/lua-$(LUA_VERSION)/src -llua

$(BUILD_DIR)/lua-$(LUA_VERSION)/src/liblua.a: | $(BUILD_DIR)
	cd $(BUILD_DIR); \
	curl -R -O http://www.lua.org/ftp/lua-$(LUA_VERSION).tar.gz; \
	tar zxf lua-$(LUA_VERSION).tar.gz; \
	cd lua-$(LUA_VERSION); \
	make generic CC='$(CC)'; \

$(OBJS): | $(BUILD_DIR)

$(BUILD_DIR):
	$(MKDIR_P) $(BUILD_DIR)

.PHONY: clean

clean:
	$(RM) -r $(_BUILD_DIR); \
	$(RM) a.out*