///////////////////////////////////////////////////////////////////////////////
// MASTER ANALYZER
///////////////////////////////////////////////////////////////////////////////

function MasterAnalyzer ( playerNameMapping ) {
	
	this.subAnalyzers = [];
	
	// use combatantinfo to build new subanalyzers for players,
	// and pass events through to subanalyzers for matching player
	this.parse = function( wclEvent ) {	
		if( wclEvent.type == 'combatantinfo' ) {
			this.addSubAnalyzers( wclEvent );
		} else {
			for(subAnalyzer of this.subAnalyzers) {
				if( wclEvent.sourceID == subAnalyzer.playerId ) {
					subAnalyzer.parse( wclEvent );
				}
			}
		}
	}
	
	// concats subanalyzer results to array and returns
	this.getResults = function() {
		var results = [];
		
		for(subAnalyzer of this.subAnalyzers) {
			results.push(subAnalyzer.getResult())
		}
		
		return results;
	}
	
	// register new subanalyzers here
	this.addSubAnalyzers = function( combatantinfo ) {
		var name = playerNameMapping.get(combatantinfo.sourceID);
		
		// each spec has a semi arbitrary ID
		// see: http://wowwiki.wikia.com/wiki/SpecializationID
		if( combatantinfo.specID == 105 ) {
			this.subAnalyzers.push(new RestoDruidSubAnalyzer(name, combatantinfo));
		} else if( combatantinfo.specID == 103 ) { 
			// keep this line commented in production until Feral analyzer implemented
			//this.subAnalyzers.push(new FeralDruidSubAnalyzer(name, combatantinfo));
		} else {
			this.subAnalyzers
		}
		// add more subanalyzers here
	}
	
}