package manifest

# one finding PER container pinnet to :latest - `some` iterates the list
violations contains msg if {
	some c in input.containers
	endswith(c.image, ":latest")
	msg := sprintf("container %q uses the mutable :latest tag", [c.name])
}

# one finding per privileged container
violations contains msg if {
	some c in input.containers
	c.securityContext.privileged == true
	msg := sprintf("container %q runs privileged", [c.name])
}

violations contains msg if {
	names := {c.name | # collect, as a step in the body
		some c in input.containers
		c.securityContext.privileged == true
	}
	count(names) > 0 # only report if there are any
	msg := sprintf("privileged containers: %s", [concat(", ", names)])
}

# true only when EVERY image avoids :latest
default all_pinned := false

all_pinned if {
	every c in input.containers {
		not endswith(c.image, ":latest")
	}
}

# the SET of c.name, for every container that runs privileged
# privileged_names := {c.name |
# 	some c in input.containers
# 	c.securityContext.privileged == true
# }

privileged_names contains name if {
	some c in input.containers
	c.securityContext.privileged == true
	name := c.name
}

# a lookup: container name → its image
# image_by_name := {c.name: c.image | some c in input.containers}
#
# # image_by_name[name] := image if {
# # 	some c in input.containers
# # 	name := c.name
# # 	image := c.image
# # }
image_by_name[c.name] := c.image if {
	some c in input.containers
}
