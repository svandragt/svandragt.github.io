# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	config.vm.box = "precise32"
	config.vm.provision :shell, :path => "vagrant/bootstrap.sh"
	config.vm.network "private_network", ip: "192.168.60.70"
	config.vm.network :forwarded_port, host: 4000, guest: 80

	config.vm.provider "virtualbox" do |vb|
		vb.memory = 1024
		# vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
		# vb.customize ["setextradata", :id, "VBoxInternal/Devices/e1000/0/LUN#0/Config/HostResolverMappings/Boron/HostIP", "192.168.50.55"]
		# vb.customize ["setextradata", :id, "VBoxInternal/Devices/e1000/0/LUN#0/Config/HostResolverMappings/Boron/HostNamePattern" "boron.dev"]
	end

end