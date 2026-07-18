package signup

# each rule adds ONE message to the `violations` set
violations contains "age must be at least 18" if input.age < 18

violations contains "username is required" if input.username == ""
