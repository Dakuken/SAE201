MonProg SEGMENT		;Définition du segment car .com et un seul registre
		ORG 100h	;
		ASSUME		CS:MonProg

start : 
JMP Debut	;Point d'entrée du programme
					;Saut au label début
					
Table DW PassLigne 	; Saut ligne
	  DW mess1		;mess0 = offset du message 0
	  DW mess2		;mess1 = offset du message 1
	  DW mess3		;...
	  DW mess4		;...
	  DW mess5		;...
	  DW mess6		;...
	  DW mess7		;...
	  DW mess8		;...
	  DW result		;...
	  DW mess10		;...
	  DW mess11		;...
	  DW mess12		;...
	  DW mess13		;...
	  DW mess14		;...
	  DW mess15		;...
	  DW deco1		;...
	  DW deco2		;...
	  DW mess18		;...
	
PassLigne DB 10,'$'
mess1	DB '             Bonjour, bienvenue dans votre super calculatrice.              ',10,'$'
mess2	DB 'Veuillez choisir une operation a effectuer : ',10,'$'
mess3	DB '1 pour addition.',10,'$'
mess4  	DB '2 pour soustraction.',10,'$'
mess5 	DB "Vous avez donc choisis l'addition.",10,'$'
mess6 	DB "Vous avez donc choisis la soustraction.",10,'$'
mess7 	DB 'Nombre 1 : $'
mess8	DB 'Nombre 2 : $'
result	DB 'Le resultat est : $'
mess10	DB 'Vous avez donc choisis la multiplication.',10,'$'
mess11 	DB '3 pour multiplication.',10,'$'
mess12 	DB '4 pour division.',10,'$'
mess13	DB 'Vous avez donc choisis la division.',10,'$'
mess14 	DB 'Le quotient est : $'
mess15	DB 'Le reste est : $'
mess18	DB '5 pour quitter le programme.',10,'$'
deco1 	DB '+-----------------------------------------------------------------------------+',10,'$'		;beaucoup
deco2 	DB '|                                                                             |',10,'$'

choix DB 255 DUP (?) ; Définit une zone de 255 Bytes qui contiendras le choix du menu
nombre1 DB 255 DUP (?) ; Définit une zone de 255 Bytes qui contiendras le nombre1 des calculs
nombre2 DB 255 DUP (?) ; Définit une zone de 255 Bytes qui contiendras le nombre2 des calculs
signe DB 255 DUP (?) ; Définit une zone de 255 Bytes qui contiendras le signe des calculs
signe2 DB 255 DUP (?) ; Signe2


Notgoto DB ?
Ligne DB ?
Col DB ?


;================================================================================================;
ChangeFond PROC NEAR
;Changement mode video INT 10-000		
;------------------
		MOV AH,0
		MOV AL, 10H
		INT 10H
	

;Changement couleur de fond.
;---------------------
		MOV AH,0BH
		MOV AL,3
		MOV BH,0
		MOV BL,25 ;25 == bleu de marine
		INT 10H 
;------------------------------------------  
		RET
ChangeFond ENDP

;================================================================================================;

EcritMot PROC NEAR
;===============================================;
;Afficher le message dont le numéro est dans AL.;
;Numéroté à partir de 0							;
;												;
;Paramètre d'entrée : AL						;
;Paramètre de sortie : aucun					;
;Registre détruit : aucun						;
;Autres procédures : aucune						;
;===============================================;
		PUSH BX		;Préserve BX
		PUSH AX 	;Préserve AX (on modif AH)
				
		CMP Notgoto,0
		JNZ Mot
		PUSH AX
		MOV AL,Col
		MOV AH,Ligne
		INC Ligne
		CALL GoToXY
		POP AX
Mot:
		MOV AH,0
		SHL AX,1	;multiplie le num de message par 2 pour obtenir un offset dans la table
		MOV BX,OFFSET Table
		ADD BX,AX	;BX <-- num du message
		MOV DX,[BX] ;DX <-- contenu du Xème élement de table qui ducoup est l'offset
		MOV AH,09 	;Pour l'intérruption 21
		INT 21h		;Afficher le message
		
		POP AX		;récupère AX
		POP BX		;récupère BX
		RET			;Toujours terminer par RET  sinon on revient pas là où en était
EcritMot ENDP


;================================================================================================;

LireChaine PROC NEAR
;===============================================;
;Cette procédure lit AL caractère dans DS:DX.   ;
;elle renvoie AL le nb de caractère lu			;							
;												;
;Paramètre d'entrée : AL,DS,DX					;
;Paramètre de sortie : AL,DS,DX					;
;Registre détruit : AH 							;
;Autres procédures : aucune						;
;===============================================;
		PUSH BX		;Preserve BX
		PUSH CX		;Preserve CX
		
		MOV BX,DX	;BX <-- offset du buffer
		PUSH [BX] 	;Préserve les 2 premiers Bytes du buffer (cf en dessous)
		MOV [BX],AL ;Installe le nombre de caractère à lire en pos 0 du buffer
		MOV	AH,0Ah	;Fonction 0Ah = détruire AH
		INT 21h 	; On lit les caractères
		MOV AL,[BX+1];AL <-- nombre de caractère lus = position 1 du buffer
		POP CX 		;récupére les 2 premiers bytes du buffer dans CX
		MOV	[BX],CH	;restore le premier Byte du buffer à sa valeur d'origine à
		
		POP CX		;Récupère CX
		POP BX 		;Récuprère BX
		RET 		;evidement
LireChaine ENDP


;================================================================================================;

AffASCII PROC NEAR
;===============================================;
;Cette procédure Affiche le caractère dont le   ;
;code ASCII est contenue dans AL				;							
;												;
;Paramètre d'entrée : AL						;
;Paramètre de sortie : aucun					;
;Registre détruit : aucun						;
;Autres procédures : aucune						;
;===============================================;
		PUSH AX		;On preserve AX car on modif AH
		PUSH DX		;on préserve DX
		
		MOV DL,AL	;Le code ASCII doit être dans AL pour INT 21h
		MOV AH,2	; service 2 de int 21h
		INT 21h
		
		POP DX
		POP AX
		RET
AffASCII ENDP

;================================================================================================;

AffChiffre PROC NEAR 
;===============================================;
;Cette procédure Affiche le chiffre			    ;
;contenue dans AX								;							
;												;
;Paramètre d'entrée : AX 						;
;Paramètre de sortie : aucun					;
;Registre détruit : aucun						;
;Autres procédures : aucune						;
;===============================================;
		PUSH AX		;Preserve AX on modif AH
		PUSH DX		;Preserve DX
		
		ADD AL,48 	; chiffre entre 0 et 9 donc il est dans AL
		MOV DL,AL	;Code ascii doit être dans DL pour service 2 de INT 21h
		MOV AH,2	;pour service 2 de INT 21h
		INT 21h		;affiche le caractère
		
		POP DX
		POP AX
		RET
AffChiffre ENDP

;================================================================================================;

AffDecimal PROC NEAR
;===============================================;
;Cette procédure Affiche le nombre non signé	;
;contenue dans AX								;							
;												;
;Paramètre d'entrée : AX 						;
;Paramètre de sortie : aucun					;
;Registre détruit : aucun						;
;Autres procédures : AffChiffre					;
;===============================================;	
		PUSH BX 	;Préserve BX
		PUSH CX		;Préserve CX
		
		MOV BX,10	;BX est le dénominateur
	
;Décompose le nombre et empile les chiffres obtenus
		MOV CX,0	;comptre le nb de chiffres
		
Decompose: 
			MOV DX,0 
			DIV BX 	;Calcul DX,AX / BX, le reste est dans DX
			PUSH DX	;C'est un des chiffres --> sur la pile
			INC CX	;On compte le nombre de chiffres
			CMP AX,0;Quotient = 0 ?
			JNZ Decompose
					;Non, on continue
;Affichage des chiffres, il y en a au moins 1
;Pas besoin de tester si CX = 0

Affichage:
			POP AX	;Récupère un chiffre
			CALL AffChiffre
					;Affichage d'un chiffre
			LOOP Affichage 
					;Jusqu'à plus de chiffre (dec auto de CX)
			
		POP CX
		POP BX
		RET
AffDecimal ENDP
		
		
;================================================================================================;


;Pour la déconne

GoToXY PROC NEAR
;===============================================;
;Cette procédure positionne le curseur			;							
;à la colonne AL et à la ligne AH				;
;												;
;Paramètre d'entrée : AL,AH 					;
;Paramètre de sortie : aucun					;
;Registre détruit : aucun						;
;Autres procédures : aucune						;
;===============================================;
		PUSH BX
		PUSH DX
		
		MOV DX,AX	;DH <--AH (ligne)
					;DL <--AL (colonne)
		MOV AH,2	;02h de INT 10h
		MOV BH,0	;Page 0
		INT 10h
		
		POP DX
		POP BX
		RET
GoToXY 	ENDP
		
;================================================================================================;
Clear PROC NEAR
;===============================================;
;Cette procédure efface l'écran					;
;												;
;Paramètre d'entrée : aucun 					;
;Paramètre de sortie : aucun					;
;Registre détruit : aucun						;
;Autres procédures : aucune						;
;===============================================;
		PUSH AX
		PUSH BX
		PUSH CX
		PUSH DX
		MOV Notgoto,1
		MOV AL,0	;Service 06h de INT 10h
		MOV AH,6
		
		MOV BH,7	;Attribut des caractère
		MOV CX,0	;Coin supérieur gauche
		MOV DH,24	;25 ligne (0...24)
		MOV DL,79	;80 colonne (0...79)
		INT 10h		;efface écran
		
		CALL ChangeFond
		
		MOV AL,16
		CALL EcritMot

		
		MOV AL,17
		MOV CX,10
		
boucleClear:		
		CALL EcritMot
		LOOP boucleClear

		MOV AL,16
		CALL EcritMot
		MOV Notgoto,0
		POP DX
		POP CX
		POP BX
		POP AX
		RET
Clear ENDP
		
;================================================================================================;
	
ConvNumb PROC NEAR
;===============================================;
;Cette procédure convertit une chaine de carac	;
;pointé par DS:DX en un nombre décimal dans AX	;
;												;
;Paramètre d'entrée : DS,DX 					;
;Paramètre de sortie : AX						;
;Registre détruit : BX						;
;Autres procédures : aucune						;
;===============================================;	
		PUSH CX
		PUSH DX
		PUSH SI
		
		Temp DW ?
		MOV Temp,0
		MOV AH,0
		MOV BX,DX 	; BX pointe sur début du buffer
		MOV CX,AX	;NB <-- nbre de caractère (CF. LireChaine)
		MOV AX,0 	; nombre <-- 0
		MOV SI,2 	;Premier carac en pos 2 (numérotation commence en 0) (en 1 y'a le nb)
		
		MOV DL,[BX+2]	;extrait un chiffre dans LD
		CMP DL,'-'
		JNZ	Repeter
		MOV Temp,1
		;CALL EcritMot
		ADD SI,1
		SUB CX,1
		
		
Repeter:
			MOV DX,10
			MUL DX			;nombre <-- nombre * 10
			MOV DL,[BX+SI]	;extrait un chiffre dans LD
			
			INC SI			; caractère suivant
			SUB DL,48		;ASCII -48 on a compris
			MOV DH,0		;Car ADD AX,DL est interdit
			ADD AX,DX		;Nombre + Chiffre
			LOOP Repeter	;Jusque CX = 0
			
			
		CMP signe,1
		JNZ FinConvNum
		NEG AX
			
FinConvNum:
		POP SI
		POP DX
		POP CX
		MOV BX,Temp
		RET
ConvNumb ENDP
		

;================================================================================================;
LireDecimal PROC NEAR
;===============================================;
;Cette procédure lit un nombre décimal et le 	;
; renvoie dans AX								;
;												;
;Paramètre d'entrée : AL,DX 					;
;Paramètre de sortie : AX						;
;Registre détruit : AX						;
;Autres procédures : aucune						;
;===============================================;	
		PUSH AX
		MOV AL,Col
		MOV AH,Ligne
		INC Ligne
		CALL GoToXY
		POP AX
		
		CALL LireChaine
		CALL ConvNumb
		
		RET
LireDecimal ENDP


;================================================================================================;
AffSignDecimal PROC NEAR
;===============================================;
;Cette procédure affiche le nombre non signé 	;
; dans AX 										;
;												;
;Paramètre d'entrée : AX 						;
;Paramètre de sortie : aucun					;
;Registre détruit : aucun						;
;Autres procédures : AffDecimal, AffAscii		;
;===============================================;	
		CMP signe,1
		JNZ NonSigne
			;Jump if not sign (positif)
		PUSH AX	; sauve AX car on a besoin de AL
		MOV AL,'-'
				;on affiche un '-' = MOV AL,45, 45 étant ASCII de '-'
		CALL AffASCII 
				;Appel 
		POP AX	;Recupere le nb dans AX
		NEG AX	;Prend la valer positive du nombre en calculant le cmplnt à 2
		
	;nous pouvons maintenant traiter AX comme un nombre non signé
		NonSigne:
					CALL AffDecimal
		RET
AffSignDecimal ENDP
	
	
;================================================================================================;
Addition PROC NEAR
;===============================================;
;Cette procédure lit deux nombre et les			;
;additionne renvoie dans AX le résultat			;
;												;
;Paramètre d'entrée : aucun 					;
;Paramètre de sortie : AX						;
;Registre détruit : AH,DS:DX					;
;Autres procédures : aucune						;
;===============================================;	

		
		MOV AL,7	;afficher nombre 1 :
		CALL EcritMot
		
		MOV DX, OFFSET nombre1
		MOV AL,5 ; Lire 5 caractère; 4 chiffres; 1 le CF
		CALL LireDecimal	;4562 ;AH = 45, AL = 62
		PUSH BX
		PUSH AX				;Save
		
		MOV AL,0	;passer ligne
		CALL EcritMot
		MOV AL,8	;afficher nombre 2 :
		CALL EcritMot
		
		MOV DX, OFFSET nombre2
		MOV AL,5 ;Lire 5 caractère; 4 chiffres; 1 le CF
		CALL LireDecimal		
		PUSH BX 
		PUSH AX
		
		MOV AL,0
		CALL EcritMot	
		MOV AL,9
		CALL EcritMot
		
		POP AX ; nb 2
		POP BX ; signe 2
		
		POP DX ; nb 1
		POP CX ; signe 1
		
		CMP CX,1		;1er est neg ?
		JNZ AddDeuxiemeNeg ; nan
		JMP AddPremierNeg ; oui
	
AddPremierNeg :
		CMP BX,0	; 2eme est pos ?
		JNZ AddDeuxNeg ; nan
		; que le 1 neg
		; 30 - 10
	
		CMP DX,AX		;Est ce que le nombre 1 est plus grand que le nombre deux ?
		JA	AddChiffre1PlusGrand	; oui
		JMP AddChiffre2PlusGrand	; nan
		
AddChiffre1PlusGrand :
			MOV signe,1
			;-10+1
			;2-10
			SUB DX,AX	;10-2
						;8
			MOV AX,DX	; AX = 8
			NEG AX		; AX = -8
			JMP AddFin

AddChiffre2PlusGrand :
			SUB AX,DX 
			MOV signe,0
			JMP AddFin

AddDeuxiemeNeg:
		CMP BX,1 	;2eme neg ?
		JNZ AddAucunNeg ; nan
		
		;10-30
		
		CMP DX,AX		;Est ce que le nombre 1 est plus grand que le nombre deux ?
		JAE	AddChiffre1PlusGrand2	; oui
		JMP AddChiffre2PlusGrand2	; nan
		
AddChiffre1PlusGrand2:
		;5-2
		SUB DX,AX
		MOV AX, DX
		MOV signe,0
		JMP AddFin
AddChiffre2PlusGrand2:
		SUB AX,DX
		NEG AX
		MOV signe,1
		JMP AddFin
		
		
AddAucunNeg : 
		ADD AX,DX
		MOV signe,0
		JMP AddFin
AddDeuxNeg : 
		ADD AX,DX
		MOV signe,1
		NEG AX
		
AddFin:
		CALL AffSignDecimal
		RET
Addition ENDP
	
	
		
;================================================================================================;

Soustraction PROC NEAR
;===============================================;
;Cette procédure lit deux nombre et les			;
;soustrait renvoie dans AX le résultat			;
;												;
;Paramètre d'entrée : aucun 					;
;Paramètre de sortie : AX						;
;Registre détruit : AH,DS:DX					;
;Autres procédures : aucune						;
;===============================================;	



		MOV AL,7	;afficher nombre 1 :
		CALL EcritMot
		
		MOV DX, OFFSET nombre1
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		PUSH AX
		
		
		MOV AL,0	;passer ligne
		CALL EcritMot
		
		MOV AL,8	;afficher nombre 2 :
		CALL EcritMot
		
		MOV DX, OFFSET nombre2
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		
		PUSH AX
		MOV AL,0 	;
		CALL EcritMot
		
		POP BX
		POP AX
		SUB AX,BX
		JNS fin
			MOV signe,1	
fin :		
		PUSH AX
		MOV AL,9 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL EcritMot
		POP AX
		CALL AffSignDecimal
		MOV signe,0

		RET
Soustraction ENDP

;================================================================================================;


Mult PROC NEAR
;===============================================;
;Cette procédure lit deux nombre et les			;
;soustrait renvoie dans AX le résultat			;
;												;
;Paramètre d'entrée : aucun 					;
;Paramètre de sortie : AX						;
;Registre détruit : aucun						;
;Autres procédures : aucune						;
;===============================================;	
		MOV AL,7	;afficher nombre 1 :
		CALL EcritMot
		
		id1 DW ?
		MOV DX, OFFSET nombre1
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		PUSH BX		;Signe 1
		MOV id1,AX
		
		
		MOV AL,0	;passer ligne
		CALL EcritMot

		MOV AL,8	;afficher nombre 2 :
		CALL EcritMot
		
		MOV DX, OFFSET nombre2
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		PUSH BX	;Signe 2	; 
		PUSH AX
		
		MOV AL,0	;passer ligne
		CALL EcritMot
		
		MOV AL,9
		CALL EcritMot
		
		POP AX
		MUL id1 ;AX used
		
		POP BX
		POP CX
		ADD BX,CX
		
		CMP BX,1
		JNZ finMult ;si signe un negatif
		JMP NegatifMul ;si signe positif
			  
NegatifMul: MOV signe,1
			NEG AX
					
finMult:
		CALL AffSignDecimal
		MOV signe,0
		RET
Mult ENDP
		
		
;================================================================================================;


Divi PROC NEAR
;===============================================;
;Cette procédure lit deux nombre et les			;
;soustrait renvoie dans AX le quotient et 		;
;dans BX le reste 								;
;												;
;Paramètre d'entrée : aucun 					;
;Paramètre de sortie : AX,DX					;
;Registre détruit : aucun						;
;Autres procédures : aucune						;
;===============================================;	
		MOV AL,7	;afficher nombre 1 :
		CALL EcritMot
		
		
		MOV DX, OFFSET nombre1
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		PUSH BX		;Signe 1
		PUSH AX
		
		MOV AL,0	;passer ligne
		CALL EcritMot
			
		MOV AL,8	;afficher nombre 1 :
		CALL EcritMot
		
		denom DW ?
		MOV DX, OFFSET nombre2
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		PUSH BX		;Signe 2
		MOV denom,AX
		
		
		MOV AL,0	;passer ligne
		CALL EcritMot
		
		MOV AL,14	;Affiche "Le quotient est :"
		CALL EcritMot
		POP BX
		POP AX		; On recupère le numérateur
		MOV DX,0	; On met le reste à 0
		DIV denom	; Division
		POP CX		;signe 1
		ADD BX,CX
		PUSH DX
		CMP BX,1
		JNZ PositifDiv ;si signe un positif
		
NegatifDiv: MOV signe,1
			NEG AX
			POP BX	;quotient
			NEG BX
			PUSH BX
			CALL AffSignDecimal	
			MOV AL,15	;Affiche "et le reste : "
			CALL EcritMot
			POP AX ;Reste
			CALL AffSignDecimal
			JMP finDiv
			MOV signe,1
	
	
PositifDiv:		
		CALL AffSignDecimal	
		MOV AL,15	;Affiche "et le reste : "
		CALL EcritMot
		POP AX
		CALL AffSignDecimal
finDiv:
		RET

Divi ENDP




;------------------------------------------------------------------------------------------------------------;
;------------------------------------------------------------------------------------------------------------;
;------------------------------------------------------------------------------------------------------------;
;--------------------------------------------------START-----------------------------------------------------;
;------------------------------------------------------------------------------------------------------------;
;------------------------------------------------------------------------------------------------------------;
;------------------------------------------------------------------------------------------------------------;



		
Debut:	
	
		
		CALL Clear
		
		MOV Col,2
		MOV Ligne,1
		
		MOV AL,1
		CALL EcritMot
		
		MOV AL,2
		CALL EcritMot
		
		MOV AL,3
		CALL EcritMot

		MOV AL,4
		CALL EcritMot
		
		MOV AL,11
		CALL EcritMot
		
		MOV AL,12
		CALL EcritMot
		
		MOV Col,5
		MOV DX, OFFSET choix
		MOV AL,2 ; Lire 2 caractère; 1 le chiffre; 2 le CF
		CALL LireDecimal	;Lire la chaine
		MOV Ligne,1
		MOV Col,2
		CALL Clear
		
		
Case1:
Case1C1:
		CMP AX,1		;Si AX = 1 alors AX - 1 = 0
		JNZ Case1C2
		MOV AL,5
		CALL EcritMot
		CALL Addition
		MOV DX, OFFSET nombre2
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		JMP Debut
		
Case1C2:
		CMP AX,2
		JNZ Case1C3
		MOV AL,6
		CALL EcritMot
		CALL Soustraction	
		
		MOV DX, OFFSET nombre2
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal	
		JMP Debut
		
Case1C3:
		CMP AX,3
		JNZ Case1C4
		MOV AL,10
		CALL EcritMot
		CALL Mult		
		
		MOV DX, OFFSET nombre2
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		JMP Debut
		
Case1C4:
		CMP AX,4
		JNZ Case1C5
		MOV AL,13
		CALL EcritMot
		CALL Divi		
		
		MOV DX, OFFSET nombre2
		MOV AL,5 ; Lire 3 caractère; 3 chiffres; 4 le CF
		CALL LireDecimal
		JMP Debut
		
Case1C5:
		CMP AX,5
		JNZ Other1	
		JMP ENDCase1

Other1:
		JMP Debut

ENDCase1:
		INT 20h		;Instruction de terminaison

MonProg ENDS
		END		Start
