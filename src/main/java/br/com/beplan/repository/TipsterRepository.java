package br.com.beplan.repository;

import br.com.beplan.domain.Tipster;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Tipster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipsterRepository extends JpaRepository<Tipster, Long> {
}
