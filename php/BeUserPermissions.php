<?php

function createPermissions()
{
	Permission::create(11, 'CAN_LOGIN', 'The user is allowed to log in (location specific)');
	Permission::create(55, 'CAN_CREATE_USERS', 'The user is allowed to create other users.');
	Permission::create(56, 'CAN_CHANGE_USERS', 'The user is allowed to change other users.');
	Permission::create(77, 'CAN_CHANGE_PERMISSIONS', 'The user is allowed to change the permissions from other users.');

	Permission::create(110, 'CAN_CREATE_ITEMS', 'The user is allowed to add new items to the database.');
	Permission::create(111, 'CAN_CHANGE_ITEMS', 'The user is allowed to change items in the database.');
	Permission::create(123, 'CAN_BUY_ITEMS', 'The user is allowed to buy items for a specific location.');
	Permission::create(124, 'CAN_SELL_ITEMS', 'The user is allowed to sell items in a specific location.');
	Permission::debug_showTable();
}

class Permission
{
	static $gm_permissionTable = [];
	
	protected $m_value = -1;						// -1 is bad, no function.. ;)
	protected $m_name = "UNNAMED_PERMISSION";
	protected $m_description = "No description available.";
	public function getValue() {return $this->m_value;}
	public function getName() {return $this->m_name;}
	public function getDescription() {return $this->m_description;}
	public function set($permissionValue, $permissionName, $permissionDescription) 
	{
		$this->m_value = $permissionValue;
		$this->m_name = $permissionName;
		$this->m_description = $permissionDescription;
	}
	
	public static function create($permissionValue, $permissionName, $permissionDescription)
	{
		$perm = new Permission();
		$perm->set($permissionValue, $permissionName, $permissionDescription);
		Permission::$gm_permissionTable[] = $perm;
		echo("Permissioncount: ".count(Permission::$gm_permissionTable));
	}

	public static function getByName($permissionName)
	{
		foreach(Permission::$gm_permissionTable as $perm)
		{
			if(strtolower($perm->getName())==strtolower($permissionName))
				return $perm;
		}
		// nothing found
		return -1;
	}

	public static function getByValue($permissionValue)
	{
		foreach(Permission::$gm_permissionTable as $perm)
		{
			if($perm->getValue()==$permissionValue)
				return $perm;
		}
		// nothing found
		return -1;		
	}
	
	public static function debug_showTable()
	{
		foreach(Permission::$gm_permissionTable as $perm)
		{
			echo('>'.$perm->getName()." [".$perm->getValue()."] ".$perm->getDescription()."\n");
		}
	}
}

createPermissions();
