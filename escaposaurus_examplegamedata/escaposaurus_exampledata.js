
/////////////////////////////////////////////////////////////
/// Escapausorus v1 (2020)
///	A quick and dirty framework to create small adventure game (certified vanilla JS)
/// Author: Stéphanie Mader (http://smader.interaction-project.net)
/// GitHub: https://github.com/RedNaK/escaposaurus
///	Licence: MIT
////////////////////////////////////////////////////////////


	/*
		HERE IS THE CONFIGURATION OF THE GAME
	*/
		/*either online with VOD server and JSON load of data
		either local */
		var isLocal = true ;
 		var gameRoot = "./" ;
 		var gameDataRoot = gameRoot+"escaposaurus_examplegamedata/" ;
 		var videoRoot = gameDataRoot+"videos/" ;

 		/*caller app*/
		var contactVideoRoot = videoRoot+"contactVideo/" ;

		/*full path to intro / outro video*/
		var missionVideoPath = videoRoot+"introVideo/intro1.mp4" ;
		var introVideoPath = videoRoot+"introVideo/intro2.mp4" ;
		var missingVideoPath = videoRoot+"contactVideo/missing/final.mp4" ;
		var epilogueVideoPath = videoRoot+"epilogueVideo/epiloguecredit.mp4" ;

		/*variables defined for our own sudden call events ; Example*/
		var eventVideoPath = videoRoot + "event.mp4";
		var sequenceForEvent = 1;

		/*udisk JSON path*/
		var udiskRoot = gameDataRoot+"udisk/" ;

		/*for online use only*/
		/*var udiskJSONPath = gameRoot+"escaposaurus_gamedata/udisk.json" ;
		var udiskJSONPath = "/helper_scripts/accessJSON_udisk.php" ;*/

		var udiskData =
	  	{"root":{
	  		"folders":
		  		[
		  		{"foldername":"Etape 1 - Le modèle du kimono",
				  	"files":["Affiche romantique.png","Affiche sublime.png","Affiche spectaculaire.png","Morceau kimono.png","Patrons kimonos.png","Haiku rêveur.png"]
				},
				{"foldername":"Choisir un modèle de kimono","squestion":"Quel modèle de Kimono choisir ?","password":"Furisode","sequence":0,"othername":"Etape 2 - Le tissu utilisé",
					"files": ["Echantillons tissu.png", "Première fiche descriptive des matériaux.png", "Seconde fiche descriptive des matériaux.png", "Photo officielle.png","Lettre passionelle.png","Haiku troublé.png"]
			  	},
				{"foldername":"Choisir un tissu","squestion":"Quel matériau utiliser ?","password":"Satin","sequence":1,"othername":"Etape 3 - La technique de reprisage",
					"files": ["Livre techniques.png", "Outils de Adrien.png", "Photo austère.png","Lettre menacante.png","Haiku frissonnant.png"]
			  	},
				{"foldername":"Choisir une technique","squestion":"Quelle est la technique de reprisage adaptée ?","password":"Kaketsugi","sequence":2,"othername":"Etape 4 - L'élément principal du motif",
			  		"files":["Kimono avant.png","Kimono arriere.png","Photo parfumée.png","Haiku désespéré.png"]
			  	},
				{"foldername":"Transmettre une information à Hayashi Tadamasa","squestion":"Quel est le motif représenté sur le kimono ?","password":"Feuille","sequence":3,"othername":"Etape 5 - Le coupable",
					"files": ["Photo romantique.png", "Lettre pathétique.png","Lettre funeste.png","Haiku abandonné.png"]
			  	},
				{"foldername":"Résoudre notre affaire","squestion":"Qui a détruit le kimono ?","password":"Sada Yacco","sequence":4,"othername":"Résoudre l'affaire",},

		 		],
			"files":[
				"Haiku_Enthousiaste.png"]}
		} ;

		var gameTitle = "Escaposaurus" ;
var gameDescriptionHome = "<B>1900, Paris.</B> <I>Vous êtes un habilleur - concepteur spécialisé en habillement traditionnel japonais. Par cette belle matinée de printemps, vous entrez dans votre bureau et ouvrez le colis que vous avez reçu de votre ami le commissaire d’art Hayashi Tadamasa. Que peut il bien vous vouloir ?</I> \n\n\n" ;
		var gameSecondDescription = "L’interface dans laquelle vous allez évoluer représente votre bureau. L’arborescence sur votre droite représente la liste d’étapes à accomplir pour remplir votre mission. Accomplissez les étapes l’une après l’autre en renseignant le mot qui correspond à ce qui est attendu et pour pouvoir accéder à l’étape suivante."
		var gameMissionCall = "Voici la vidéo qu'Albert a envoyé à votre bureau d'informaticien spécialisé en récupération de données";

		var gameMissionAccept = "&raquo;&raquo; Entrer dans le bureau (JOUER) &laquo;&laquo;" ;
		var gameCredit = "Un jeu conçu et réalisé par : <br/>Stéphanie Mader" ;
		var gameThanks = "Remerciements : <br/> ;)" ;

		var OSName = "Special InformaticienOS 3.11- diskloaded: Escaposaurus_Example" ;
		var explorerName = "" ;
		var callerAppName = "CALL CONTACT" ;

		/*titles of video windows*/
		var titleData = {} ;
		titleData.introTitle = "INTRODUCTION" ;
		titleData.epilogueTitle = "EPILOGUE" ;
		titleData.callTitle = "APPEL EN COURS..." ;

		/*change of caller app prompt for each sequence*/
		var promptDefault = "" ;
		var prompt = [] ;
		prompt[0] = "" ;
		prompt[1] = "" ;
		prompt[2] = "" ;
		prompt[3] = "" ;
		prompt[4] = "" ;
		prompt[5] = "" ;

		/*when the sequence number reach this, the player win, the missing contact is added and the player can call them*/
		var sequenceWin = 5 ;

		/*before being able to call the contacts, the player has to open the main clue of the sequence as indicated in this array*/
		/*if you put in the string "noHint", player will be able to immediatly call the contact at the beginning of the sequence*/
		/*if you put "none" or anything that is not an existing filename, the player will NOT be able to call the contacts during this sequence*/
		var seqMainHint = [] ;
		seqMainHint[0] = "noHint";
		seqMainHint[1] = "noHint";
		seqMainHint[2] = "noHint" ;
		seqMainHint[3] = "noHint" ;
		seqMainHint[4] = "noHint" ;
		seqMainHint[5] = "noHint" ;



		/*contact list, vid is the name of their folder in the videoContact folder, then the game autoload the video named seq%number of the current sequence%, e.g. seq0.MP4 for the first sequence (numbered 0 because computer science habits)
	their img need to be placed in their video folder, username is their displayed name
		*/
		var normalContacts = [] ;

		normalContacts[0] = {"vid" : "Sada_Yacco", "vod_folder" : "", "username" : "Sada Yacco", "canal" : "video", "avatar" : "nata_avatar.jpg"} ;
		normalContacts[1] = {"vid" : "Hayashi_Tadama", "vod_folder" : "", "username" : "Hayashi Tadama", "canal" : "video", "avatar" : "denise_avatar.jpg"} ;
		normalContacts[2] = {"vid" : "Otojirō_Kawakami", "vod_folder" : "", "username" : "Otojirō Kawakami", "canal" : "video", "avatar" : "nata_avatar.jpg"} ;

		/*ce qui apparait quand on trouve le dernier élément du disque dur*/
		finalStepAdded = "Vous devriez la joindre pour lui en parler..." ;

		/*the last call, it can be the person we find in the end or anyone else we call to end the quest, allows the game to know it is the final contact that is called and to proceed with the ending*/
		var missingContact = {"vid" : "missing", "vod_folder" : "","username" : "Sada Yacco",  "canal" : "video", "avatar" : "nata_avatar.jpg"} ;

		/*Lou only send text message, they are stored here*/
		var tips = {} ;
		tips['Albert'] = [] ;
		tips['Albert'][0] = "Je peux pas répondre à votre appel. Mais je peux vous répondre par écrit. Donc vous cherchez le surnom d'un guide ? Je crois que les contacts sont des guides justement, essayez peut-être de les appeler." ;
		tips['Albert'][1] = "" ;
		tips['Albert'][2] = "" ;
		tips['Albert'][3] = "Ah zut, un dossier verouillé sans infos dans scan mémo ? Y'a forcément un truc mnémotechnique facile à retenir ou retrouver. Les guides en disent quoi ?" ;
		tips['Albert'][4] = "Ah zut, un dossier verouillé sans infos dans scan mémo ? Y'a forcément un truc mnémotechnique facile à retenir ou retrouver. Les guides en disent quoi ?" ;


		/*text for the instruction / solution windows*/
		var instructionText = {} ;
		instructionText.winState = "Vous avez retrouvé l'id GPS et vous pouvez appeler les secours du secteur." ;
		instructionText.lackMainHint = "" ;
		instructionText.password = "Vous devez trouver et entrer le mot de passe d'un des dossiers de la boite de droite. Vous pouvez trouver le mot de passe en appelant les contacts de la boite de gauche.<br/>Pour entrer un mot de passe, cliquez sur le nom d'un dossier et une fenêtre s'affichera pour que vous puissiez donner le mot de passe." ;

		/*please note the %s into the text that allow to automatically replace them with the right content according to which sequence the player is in*/
		var solutionText = {} ;
		solutionText.winState = "Si Sabine a été secourue, le jeu est fini bravo." ;
		solutionText.lackMainHint = "Vous devez ouvrir le fichier <b>%s</b><br/>" ;
		solutionText.password = "Vous devez déverouiller le dossier <b>%s1</b><br/>avec le mot de passe : <b>%s2</b><br/>" ;