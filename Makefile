LUA_VERSION ?= 5.4.3
AMALG_VERSION ?= 0.8

all: lua amalg.lua

lua:
	curl -R -O http://www.lua.org/ftp/lua-$(LUA_VERSION).tar.gz; \
	tar zxf lua-$(LUA_VERSION).tar.gz; \
	cd lua-$(LUA_VERSION); \
	make
	cp -p lua-$(LUA_VERSION)/src/lua .

amalg.lua:
	curl -J -L -R -o amalg-$(AMALG_VERSION).tar.gz https://github.com/siffiejoe/lua-amalg/tarball/v$(AMALG_VERSION); \
	mkdir amalg-$(AMALG_VERSION); \
	tar zxf amalg-$(AMALG_VERSION).tar.gz -C amalg-$(AMALG_VERSION) --strip-components=1
	cp -p amalg-$(AMALG_VERSION)/src/amalg.lua .
