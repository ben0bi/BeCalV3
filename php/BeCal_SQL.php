<?php
require __DIR__.'/sql.php';

class BeSQL extends SQL
{

/* Table Names are in the config file. */


/* Page navigating queries. */
/*	public static function query_page_getAfterOrEqual($id)
		{return "SELECT * FROM ".SQL::$table_comicpage." WHERE `pageorder` >= $id ORDER BY `pageorder` ASC LIMIT 1;";}
	public static function query_page_getBeforeOrEqual($id)
		{return "SELECT * FROM ".SQL::$table_comicpage." WHERE `pageorder` <= $id ORDER BY `pageorder` DESC LIMIT 1;";}
	public static function query_page_getFirst() {return "SELECT * FROM ".SQL::$table_comicpage." ORDER BY `pageorder` ASC LIMIT 1;";}
	public static function query_page_getLast() {return "SELECT * FROM ".SQL::$table_comicpage." ORDER BY `pageorder` DESC LIMIT 1;";}

/* Archive queries */
/*	public static function query_archives() {return "SELECT * FROM ".SQL::$table_comicpage." WHERE 1 ORDER BY `pageorder` DESC;";}
	public static function getAllAfterPageorder($pageorder)
		{return "SELECT * FROM ".SQL::$table_comicpage." WHERE `pageorder` > \"$pageorder\"";}

/* Create and update queries */

// USER TABLE
	// How many users are in the database? Used to create the root account.
	public static function returnUserCount()
	{
		global $table_becalusers;
		$q = "SELECT * FROM ".$table_becalusers;
		SQL::openConnection();
		$result = SQL::query($q);
		$count = 0;
		foreach($result as $row)
		{
			$count++;
		}
		SQL::closeConnection();
		return $count;
	}

	// output the user count as text.
	public static function getUserCount()
	{
		echo(BeSQL::returnUserCount());
	}

	// WARNING: Create root account ONLY if there are 0 users. This is needed to prevent hackers from creating root accounts by setting JS variables.
	public static function createRootUser($name, $originalpw)
	{
		global $table_becalusers;

		$newpw = sha1($originalpw);
		$name = SQL::textToSQL($name);
		$usercount = BeSQL::returnUserCount();
		// get create date.
		$crd = date('Y-m-i H:i:s');

		if($name!='' && $usercount<=0)
		{
			$query = "INSERT INTO ".$table_becalusers.' (`name`, `passwordhash`, `createdate`) VALUES("'.$name.'", "'.$newpw.'", "'.$crd.'")';
//			echo($query);
			SQL::openConnection();
			SQL::query($query);
			SQL::closeConnection();
			echo("200:OK");
			return;
		}
		echo("There are already some users.");
	}

// CALENDAR TABLE

// create a new calendar event.
	public static function insert_event($title, $startdate, $enddate, $eventtype, $color, $audiofile ,$summary)
	{
		global $table_calendarevents;
		//$createdate=date('Y-m-d H:i:s');
		$title=SQL::textToSQL($title);
		$summary=SQL::textToSQL($summary);
		$audiofile=SQL::textToSQL($audiofile);
		return "INSERT INTO ".$table_calendarevents.' (`title`, `startdate`, `enddate`, `eventtype`, `color`, `summary`, `audiofile`) VALUES("'.$title.'", "'.$startdate.'", "'.$enddate.'", "'.$eventtype.'", "'.$color.'", "'.$summary.'", "'.$audiofile.'");';
	}

// update an existing calendar event.
	public static function update_event($dbid, $title, $startdate, $enddate, $eventtype, $color, $audiofile, $summary)
	{
		global $table_calendarevents;
		//$createdate=date('Y-m-d H:i:s');
		$title=SQL::textToSQL($title);
		$summary=SQL::textToSQL($summary);
		$audiofile=SQL::textToSQL($audiofile);
		return 'UPDATE '.$table_calendarevents.' SET `title` = "'.$title.'", `startdate` = "'.$startdate.'", `enddate` = "'.$enddate.'", `eventtype` = "'.$eventtype.'", `color` = "'.$color.'", `summary` = "'.$summary.'", `audiofile` = "'.$audiofile.'" WHERE `id` = "'.$dbid.'";';
	}

/* delete an event. */
	public static function delete_event($id)
	{
		global $table_calendarevents;
		return SQL::delete_from_table($table_calendarevents,'id',$id);
	}

/* get the audio file of a specific event. DB connection must be established before. */
	public static function get_audio_filename($id)
	{
		global $table_calendarevents;
		$query = 'SELECT * FROM '.$table_calendarevents.' WHERE `id` = "'.$id.'"';
		$result = SQL::query($query);
		$first=SQL::getFirstRow($result);
		return $first->audiofile;
	}

/* Get all events between two dates. */
	public static function getCalendarEventsBetween($startdate, $enddate)
	{
		global $table_calendarevents;

		SQL::openConnection();
//		$query = 'SELECT * FROM '.$table_calendarevents.' WHERE `startdate` <= "'.$enddate.'" AND `enddate` >= "'.$startdate.'"';
		$query = 'SELECT * FROM '.$table_calendarevents.' WHERE (`startdate` <= "'.$enddate.'" AND `enddate` >= "'.$startdate.'") OR `eventtype` = "1"';
		$result = SQL::query($query);
		SQL::closeConnection();
		return $result;
	}

	/* Get all open TODO-events. */
/*	public static function getOpenTodos()
	{
		global $table_calendarevents;

		SQL::openConnection();
		$query = 'SELECT * FROM '.$table_calendarevents.' WHERE `eventtype` = "1" ORDER BY `startdate` ASC';
		$result = SQL::query($query);
		SQL::closeConnection();
		return $result;
	}
*/

	/* Get all TODO-events. */
	public static function getAllTodos()
	{
		global $table_calendarevents;

		SQL::openConnection();
		$query = 'SELECT * FROM '.$table_calendarevents.' WHERE `eventtype` = "1" OR `eventtype` = "2" ORDER BY `enddate` ASC';
		$result = SQL::query($query);
		SQL::closeConnection();
		return $result;
	}
}

