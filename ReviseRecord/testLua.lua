	--元表与__index
	local a = {
		--name = "huangdong",
	}

	local meta_a = {
		__index = {
			name = "blake",
			age = 34,
			sex = 0,
		},
    } 
    setmetatable(a, meta_a)
	print(a.name)