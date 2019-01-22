<?php
require __DIR__.'/../config/DBconfig.php';

class SQL
{
/* Translate text "to" SQL */
	public static function textToSQL($txt)
	{
		$strlen = strlen($txt);
		$output="";
		for( $i = 0; $i <= $strlen; $i++ )
		{
   			$char = substr( $txt, $i, 1 );
			switch($char)
			{
				case '"': $output=$output.'%%1'; break;
				case "'": $output=$output.'%%2'; break;
				case "`": $output=$output.'%%3'; break;
				case "´": $output=$output.'%%4'; break;
				case chr(13): $output=$output.'%%5';break;
				default:
					$output=$output.$char;
			}
		}
		return $output;
	}

/* Translate text from SQL */
	public static function sqlToText($txt)
	{
		$strlen = strlen($txt);
		$output="";
		$trigger = 0;
		for( $i = 0; $i <= $strlen; $i++)
		{
   			$char = substr( $txt, $i, 1 );
			switch($char)
			{
				case '%': $trigger=$trigger+1;break;
				case "1":
					$t="1";
					if($trigger==2) {$t='"';}
					$output=$output.$t;
					$trigger=0;
					break;
				case "2":
					$t="2";
					if($trigger==2) {$t="'";}
					$output=$output.$t;
					$trigger=0;
					break;
				case "3":
					$t="3";
					if($trigger==2) {$t="`";}
					$output=$output.$t;
					$trigger=0;
					break;
				case "4":
					$t="4";
					if($trigger==2) {$t="´";}
					$output=$output.$t;
					$trigger=0;
					break;
				case "5":
					$t="5";
					if($trigger==2) {$t=chr(13);}
					$output=$output.$t;
					$trigger=0;
					break;
				default:
					if($trigger==1)
						$output=$output.'%';
					if($trigger==2)
						$output=$output.'%%';
					$output=$output.$char;
					$trigger=0;
			}
		}
		return $output;
	}

/* Global Queries */
	public static function delete_from_table($tablename,$what, $value)
		{return 'DELETE FROM '.$tablename.' WHERE `'.$what.'` = "'.$value.'";';}
	public static function select_from_table($tablename,$what, $value)
		{return 'SELECT * FROM '.$tablename.' WHERE `'.$what.'` = "'.$value.'";';}
	public static function select_from_table_idASC($tablename,$what, $value)
		{return 'SELECT * FROM '.$tablename.' WHERE `'.$what.'` = "'.$value.'" ORDER BY `id` ASC;';}
	public static function select_from_table_idDESC($tablename,$what, $value)
		{return 'SELECT * FROM '.$tablename.' WHERE `'.$what.'` = "'.$value.'" ORDER BY `id` DESC;';}
	public static function select_all($fromtable) {return 'SELECT * FROM '.$fromtable.';';}
	public static function update_single_value($table, $what, $whatvalue, $where,$wherevalue)
		{
			$whatvalue=SQL::textToSQL($whatvalue);
			$wherevalue=SQL::textToSQL($wherevalue);
			return 'UPDATE '.$table.' SET `'.$what.'` = "'.$whatvalue.'" WHERE `'.$where.'` = "'.$wherevalue.'";';
		}
	public static function getLastInsertedID() {return mysqli_insert_id(self::$db_connection);}

/* DB Stuff */
	private static $db_connection=-1;
	private static $feedback="";
	public static function Con() {return SQL::$db_connection;}
	public static function Feedback() {return SQL::$feedback;}

	// opens and selects the database.
	public static function openConnection()
	{
		self::$feedback=""; // reset feedback on a new connection
		global $db_host, $db_user, $db_pass, $db_name;
		SQL::$db_connection=mysqli_connect($db_host, $db_user, $db_pass, $db_name);
		if(mysqli_connect_errno())
			self::$feedback="DB Connection failed: ".mysqli_connect_error()."<br />";
		return self::$db_connection;
	}

	// closes the database connection
	public static function closeConnection()
	{
		//if(SQL::$db_connection!=-1)
		//{
			mysqli_close(SQL::$db_connection);
			SQL::$db_connection=-1;
		//}
	}

	// make an sql query and return the result.
	public static function query($sql)
	{
		if($result=mysqli_query(self::$db_connection,$sql))
		{
			return $result;
		}else{
			$fb=mysqli_error(self::$db_connection);
			//echo(" ERROR ".mysqli_error($this->db_connection));
			SQL::$feedback=SQL::$feedback.$fb."</br>";
			return -1;
		}
	}

	// get the first row of a result.
	public static function getFirstRow($result)
	{
		if(!$result)
			return false;

		while($row=mysqli_fetch_object($result))
		{
			//return first row.
			return $row;
		}
		return false;
	}
}
